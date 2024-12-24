import * as AWS from 'aws-sdk';

interface ParamObject {
  region: string;
  IdentityStoreId: string;
  accessKeyId: string;
  secretAccessKey: string;
  awsGroups: string[];
}

interface GroupMembershipChange {
  addToGroup: string[];
  removeFromGroup: string[];
}

export async function onExecutePostLogin(event: any, api: any) {
  console.log("Running actions:", "awsSaml");

  // Only continue on auth0 prod tenant
  if (event.tenant.id !== "auth") {
    console.log(`Skipping awsSAML; tenant is ${event.tenant.id}`);
    return;
  }

  let paramObj: ParamObject;

  const clientID = event.client.client_id || "";
  switch (clientID) {
    case "JR8HkyiM2i00ma2d1X2xfgdbEHzEYZbS":
      // IT billing account params
      paramObj = {
        region: "us-west-2",
        IdentityStoreId: event.secrets.AWS_IDENTITYSTORE_ID_IT,
        accessKeyId: event.secrets.AWS_IDENTITYSTORE_ACCESS_ID_IT,
        secretAccessKey: event.secrets.AWS_IDENTITYSTORE_ACCESS_KEY_IT,
        awsGroups: [
          "fuzzing_team",
          "mozilliansorg_aws_billing_access",
          "mozilliansorg_cia-aws",
          "mozilliansorg_consolidated-billing-aws",
          "mozilliansorg_consolidated-billing-aws-readonly",
          "mozilliansorg_discourse-devs",
          "mozilliansorg_http-observatory-rds",
          "mozilliansorg_iam-admins",
          "mozilliansorg_iam-in-transition",
          "mozilliansorg_iam-in-transition-admin",
          "mozilliansorg_iam-readonly",
          "mozilliansorg_meao-admins",
          "mozilliansorg_mozilla-moderator-devs",
          "mozilliansorg_partinfra-aws",
          "mozilliansorg_pdfjs-testers",
          "mozilliansorg_pocket_cloudtrail_readers",
          "mozilliansorg_project-guardian-admins",
          "mozilliansorg_relay_developer",
          "mozilliansorg_searchfox-aws",
          "mozilliansorg_secops-aws-admins",
          "mozilliansorg_sre",
          "mozilliansorg_sumo-admins",
          "mozilliansorg_sumo-devs",
          "mozilliansorg_voice_aws_admin_access",
          "mozilliansorg_web-sre-aws-access",
          "mozilliansorg_webcompat-alexa-admins",
          "team_mdn",
          "team_netops",
          "team_opsec",
          "team_se",
          "team_secops",
          "voice-dev",
          "vpn_sumo_aws_devs",
        ]
      };
      break;
    case "pQ0eb5tzwfYHnAtzGuk88pzxZ68szQtk":
      // Pocket Billing Account
      paramObj = {
        region: "us-east-1",
        IdentityStoreId: event.secrets.AWS_IDENTITYSTORE_ID_POCKET,
        accessKeyId: event.secrets.AWS_IDENTITYSTORE_ACCESS_ID_POCKET,
        secretAccessKey: event.secrets.AWS_IDENTITYSTORE_ACCESS_KEY_POCKET,
        awsGroups: [
          "mozilliansorg_pocket_admin",
          "mozilliansorg_pocket_backend",
          "mozilliansorg_pocket_backup_admin",
          "mozilliansorg_pocket_backup_readonly",
          "mozilliansorg_pocket_cloudtrail_readers",
          "mozilliansorg_pocket_dataanalytics",
          "mozilliansorg_pocket_datalearning",
          "mozilliansorg_pocket_developer",
          "mozilliansorg_pocket_fin_ops",
          "mozilliansorg_pocket_frontend",
          "mozilliansorg_pocket_marketing",
          "mozilliansorg_pocket_mozilla_sre",
          "mozilliansorg_pocket_qa",
          "mozilliansorg_pocket_readonly",
          "mozilliansorg_pocket_sales",
          "mozilliansorg_pocket_ads",
          "mozilliansorg_pocket_aws_billing",
          "mozilliansorg_infrasec",
        ],
      }
      break;
    case "jU8r4uSEF3fUCjuJ63s46dBnHAfYMYfj":
      // MoFo Billing Account
      paramObj = {
        region: "us-east-2",
        IdentityStoreId: event.secrets.AWS_IDENTITYSTORE_ID_MOFO,
        accessKeyId: event.secrets.AWS_IDENTITYSTORE_ACCESS_ID_MOFO,
        secretAccessKey: event.secrets.AWS_IDENTITYSTORE_ACCESS_KEY_MOFO,
        awsGroups: [
          "mozilliansorg_mofo_aws_admins",
          "mozilliansorg_mofo_aws_community",
          "mozilliansorg_mofo_aws_everything",
          "mozilliansorg_mofo_aws_labs",
          "mozilliansorg_mofo_aws_projects",
          "mozilliansorg_mofo_aws_sandbox",
          "mozilliansorg_mofo_aws_secure",
          "mozilliansorg_infrasec",
        ],
      };
      break;
    case "c0x6EoLdp55H2g2OXZTIUuaQ4v8U4xf9":
      // CloudServices billing account params
      paramObj = {
        region: "us-west-2",
        IdentityStoreId: event.secrets.AWS_IDENTITYSTORE_ID_CLOUDSERVICES,
        accessKeyId: event.secrets.AWS_IDENTITYSTORE_ACCESS_ID_CLOUDSERVICES,
        secretAccessKey: event.secrets.AWS_IDENTITYSTORE_ACCESS_KEY_CLOUDSERVICES,
        awsGroups: [
          "mozilliansorg_aws_billing_access",
          "mozilliansorg_cloudservices_aws_admin",
          "mozilliansorg_cloudservices_aws_autograph_admin",
          "mozilliansorg_cloudservices_aws_autograph_dev",
          "mozilliansorg_cloudservices_aws_developer_services_dev",
          "mozilliansorg_cloudservices_aws_fxa_developers",
          "mozilliansorg_infrasec"
        ],
      };
      break;
    default:
      return; // Not an AWS login, continue auth pipeline
  }

  // Instantate and set Region
  const i = new AWS.IdentityStore({
    region: paramObj.region,
    apiVersion: "2020-06-15",
    accessKeyId: paramObj.accessKeyId,
    secretAccessKey: paramObj.secretAccessKey,
  });

  const IdentityStoreId = paramObj.IdentityStoreId;
  const userName = event.user.email;
  let AWSUserId = "";

  // This is a list of groups that are mapped to AWS groups
  const AWS_GROUPS = paramObj.awsGroups;

  // Filter the users Auth0 groups down to only those mapped to AWS groups
  function filterAWSGroups(groups: string[]): string[] {
    const filteredGroups = groups.filter((x) => AWS_GROUPS.includes(x));
    return filteredGroups;
  }

  function userAuth0Groups(proposedGroups: string[], existingGroups: string[]): GroupMembershipChange {
    const addToGroup: string[] = proposedGroups.filter((x) => !existingGroups.includes(x));
    const removeFromGroup: string[] = existingGroups.filter(
      (x) => !proposedGroups.includes(x)
    );
    return { addToGroup, removeFromGroup };
  }

  function createGroupMemberships(addToGroup: string[]): Promise<any> {
    const creationPromises = [];
    for (const groupId of addToGroup) {
      const params = {
        IdentityStoreId: IdentityStoreId,
        GroupId: groupId,
        MemberId: {
          UserId: AWSUserId,
        },
      };
      creationPromises.push(i.createGroupMembership(params).promise());
    }
    return Promise.all(creationPromises);
  }

  function removeGroupMemberships(removeMembershipId: string[]): Promise<any> {
    const removalPromises = [];
    for (const membershipId of removeMembershipId) {
      const params = {
        IdentityStoreId: IdentityStoreId,
        MembershipId: membershipId,
      };
      removalPromises.push(i.deleteGroupMembership(params).promise());
    }
    return Promise.all(removalPromises);
  }

  function fetchAWSUUID() {
    const params = {
      Filters: [
        {
          AttributePath: "UserName",
          AttributeValue: userName,
        },
      ],
      IdentityStoreId: IdentityStoreId,
    };
    const userId = i.listUsers(params).promise();
    return userId; // returns promise
  }

  function fetchUsersAWSGroups(userUUID: string) {
    const params = {
      IdentityStoreId: IdentityStoreId,
      MemberId: {
        UserId: userUUID,
      },
      MaxResults: 50,
    };
    // TODO: handle pagenation!!!
    const userMembership = i.listGroupMembershipsForMember(params).promise();
    return userMembership;
  }

  function fetchGroupNameMap(groupList: any) {
    const groupPromises = [];
    for (const group of groupList) {
      const params = {
        GroupId: group.GroupId,
        IdentityStoreId: IdentityStoreId,
      };
      groupPromises.push(i.describeGroup(params).promise());
    }
    return Promise.all(groupPromises);
  }

  function getGroupIds(groupList: any) {
    const promisedGroupIds = [];
    for (const groupName of groupList) {
      const params = {
        IdentityStoreId: IdentityStoreId,
        AlternateIdentifier: {
          UniqueAttribute: {
            AttributePath: "DisplayName",
            AttributeValue: groupName,
          },
        },
      };
      promisedGroupIds.push(i.getGroupId(params).promise());
    }
    return Promise.all(promisedGroupIds);
  }

  function createUser() {
    const params = {
      IdentityStoreId: IdentityStoreId,
      DisplayName: event.user.name,
      UserName: event.user.email,
      Name: {
        FamilyName: event.user.family_name,
        GivenName: event.user.given_name,
      },
      Emails: [
        {
          Primary: true,
          Value: event.user.email,
        },
      ],
    };
    return i.createUser(params).promise();
  }

  // Main
  try {
    // Get the users group list filtered down to only AWS related groups
    const proposedGroups: string[] = filterAWSGroups(event.user.groups);

    // Fetch users AWS UUID
    const userObjList = await fetchAWSUUID();
    if (userObjList.Users.length === 0) {
      console.log(
        `[${IdentityStoreId}] Creating User (${userName}) in AWS IdentityStore`
      );
      AWSUserId = (await createUser()).UserId;
    } else {
      AWSUserId = userObjList.Users[0].UserId;
    }

    // Get users existing AWS group membership
    const usersAWSGroups = await fetchUsersAWSGroups(AWSUserId);

    const usersAWSGroupNames: any[] = await fetchGroupNameMap(
      usersAWSGroups.GroupMemberships
    );
    const existingGroups: string[] = usersAWSGroupNames.map((item) => item.DisplayName);

    // Diff the proposed groups and the existing groups
    const groupActionList: GroupMembershipChange = userAuth0Groups(proposedGroups, existingGroups);
    const addToGroup = groupActionList.addToGroup; // DisplayName list
    const removeFromGroup = groupActionList.removeFromGroup; // DisplayName list

    if (addToGroup.length > 0 || removeFromGroup.length > 0) {
      console.log(
        `[${IdentityStoreId}] Add user (${userName}) to: `,
        addToGroup
      );
      console.log(
        `[${IdentityStoreId}] Remove user (${userName}) from: `,
        removeFromGroup
      );

      const addToGroupIds = (await getGroupIds(addToGroup)).map(
        (item) => item.GroupId
      );

      // From the groupsmembership object, filter and map group ids to be removed from
      const removeGroupIds = usersAWSGroupNames
        .filter((item) => removeFromGroup.includes(item.DisplayName))
        .map((item) => item.GroupId);
      const removeMembershipId: any[] = usersAWSGroups.GroupMemberships.filter(
        (item) => removeGroupIds.includes(item.GroupId)
      ).map((item) => item.MembershipId);

      // Create group memberships
      const addPromise = createGroupMemberships(addToGroupIds);

      // Delete group memberships
      const removePromise = removeGroupMemberships(removeMembershipId);
      return Promise.all([addPromise, removePromise]);
    }

    return;
  } catch (err) {
    console.error(err);
    return api.access.deny(err);
  }
}
