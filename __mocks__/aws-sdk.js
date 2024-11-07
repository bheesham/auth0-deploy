// __mocks__/aws-sdk.js


const config = {
  update: jest.fn(),
};

class IdentityStore {
  constructor() {}

//createGroupMembership
//deleteGroupMembership
//listUsers
//listGroupMembershipsForMember
//describeGroup
//getGroupId
//createUser

  createGroupMembership(params) {
    return {
      promise: jest.fn().mockImplementation((key, value) => {})
    };
  }
  deleteGroupMembership(params) {
    return {
      promise: jest.fn().mockResolvedValue({
        SecretString: JSON.stringify({
        }),
      }),
    };
  }
  listUsers(params) {
    return {
      promise: jest.fn().mockResolvedValue({
        SecretString: JSON.stringify({
        }),
      }),
    };
  }
  listGroupMembershipsForMember(params) {
    return {
      promise: jest.fn().mockResolvedValue({
        SecretString: JSON.stringify({
        }),
      }),
    };
  }
  describeGroup(params) {
    return {
      promise: jest.fn().mockResolvedValue({
        SecretString: JSON.stringify({
        }),
      }),
    };
  }
  getGroupId(params) {
    return {
      promise: jest.fn().mockResolvedValue({
        SecretString: JSON.stringify({
        }),
      }),
    };
  }
  createUser(params) {
    return {
      promise: jest.fn().mockResolvedValue({
        SecretString: JSON.stringify({
        }),
      }),
    };
  }
}

class SecretsManager {
  constructor() {}

  getSecretValue(params) {
    return {
      promise: jest.fn().mockResolvedValue({
        SecretString: JSON.stringify({
          jwtMsgsRsaSkey: "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBdWlsUXZtbzRNcEtJT3B1empDSFJaajRGamk3dFJTMGhCeDYwRDV5bmZoRVhtMmVOCjhnQ1Z5RlBQc3VYd0YvM1I1aU5tbTk3VHJDQVVLWnJOUHZQbjlXc0ZvSGZIeXBBZUUwTVlVNC9RSEZNRk9XWmoKQ1I2WGZ1Z0tIaTZUelI4YWcxRW5kWXVkNzhzN2dMaFp6UHJkcWhoQkRKcS9vaTVPMDhBNWdiWTZFbEFTVVBMWApZYTNDTUVoMGIzbWp4TUYxcHBEay9yeUs1TDRoRlpiUzhJQlRYMHkyUldsRWpBTk13MVBzb3VnTmlRS1FQdm1wCmRicVBLTnBIZkxHcjJXdkoxeGI1OWJuT0JvRmp1d1JrOUlhQkRnNXhINVdsYjZGd2piN1B3WnRqRUkvTkZXMVcKaU43Ujl4a3pzY0pJYXVBT0NDZndkOXF0UWhHVFNvU1c4b2xOQlFJREFRQUJBb0lCQUc0SmtkS2IwcEFDRVVnagpWS1BXTVlJdjB2VFNSQ21KbldZcC9lRGtoaFI4WWVuWDhnMUR6MFZVVlFhMzU0MG0yUFVobzdzcW9RK3kvbmdCCktxUzFZenlyZiszMEgwSmFvWXhkTW5uaUhlOUFHMnhzV3NtL0xXazBHeGJ3RFNsSDQxSVBuRFZjeTRROEt2WFIKQWpPcGJYRG5XVHZzRkszMmxWMlExKzBXRzRsS2pOc1NnaU1ZNG5ORUIvVkxWOVU1RUFRRXIwWllScjk1R2RLZwpsM3FDcjhDelhZc0Z2bzJZRHVqWjNlV202OHdDOW95TGh4WGVEQllscEo1VDNyOTRCN2dEL1c0VGNjSUFYS3VQCnA0R2NPT3M0Nm4yemtQUFpOTUt6Z1NvbTA5OTNvWmNMUlJPb0cyVVpKQ2xxYy84NzBGaUMyVzEwK0lOaEtrWGsKaFBmendsa0NnWUVBNDZLZkhHSGtuRG5WbW9CTWFpb2NHZ1BCcURnTkxveUdpNHBhYXdBdUYrL3p1RmY4N1RZegpoTk4vNXpNL2tsTGxSNHRtZ2hEUHcvU0w4cGkrcFVSdEMwNmRKNjRpRERIbmVrdDRLQVZVdS84a1lTeTl5aWpnCnlzRUlmbG92d25Pc252aHhBcVkvR1FEMmRRVFgxUVFkK21uUEN1UFJUQlZpTFlzdkhYL1RkS3NDZ1lFQTBWdTIKT284YXBiUTNFQS8xblJrUGdqanpNVHNhY0FhL29hQkM3enZlVktGdXdqbEVYTSs0bnhxQU1iQ1ozZStwcTlVSwpMT1YvY2hTeFZjYXlacFRZTlhqNWFLTENBMU1Jd2lSaGJ6Q3pHNWYyWWVjeTJlczhyQU1qVlNqdU5nNHpNN25hClBZQzBYNncxb3dXVnA0Z0RhVGtPdVRHTjNmRFFkSmluM1F4YVpROENnWUVBcSt6MU0yQ1VZNUlpekhBK1JxakwKVkxLbG4wSEdZdlByNHBSNk9mcUcxYmw3WUMzRWIvelI2RzQ5V2dlUTZoa0Y1b1ZZeEwraHpDUjFWcU1heW9QbAp2L1orSjZ3VE54YXg5K0hzUEgzYVE2c3VkTjV2OGJIeUpmQ3BVNVVXSVUxd2dSaXZjZ3JSK1RhSzdsTGNHSnpsCmIyNWUyNkM1UVRlZFVUeWdOeTJHTGNVQ2dZRUF1YzRmYU5GZzRQZVVkdGp6THozeW1heFppYlBldnRYK2RUOTYKcUVBR0RpNUgwbkJvejhZN0lGbXd0R2o3NWhDeUVTSytLU0oxZlpZSDNReS9nSE5SZ0FPaHRzL2NTSDhGSXVpTwo0TlBqNGZWNFlXT0RxZ3d3aUtrd1RvQkpDZ2lJUUx3TmlOQVZSV1BkSnBYcVFBbGluWnhhQ05xR0FoZWJxaDloCnU3a2U4TmtDZ1lBYUR5K1praE5ZaDQ0QlVNbnNHZVJEYkhQbHhyb1RaL0RxYlpNdElKZitMWThscm9sYmNrTm8KTGNJVEhPckV4UjNTRXhadktSNGFUbTlIbFh5eU1NSVdraWlzUkhQMVJ6bTMwR2tVb3pUZ2ROMXZEQk5MZWlYawp1bVlvcW40V1hVdEpSUGtRdktIaWpyVzNiL01iQWdnck5maCtYcVlKbzA5aEc1bS81SVRKWGc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=",
          changeapi_auth0_private_key: "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKS3dJQkFBS0NBZ0VBNXF1eUNaLzl0b0lYMWIxUEZjRHJwT2pQMm5ERklSSGx2SXlrWEdSbWZOS21Xd0pyCk84QVh4MkswK0ZWWjFmNWlaSnFqSCtBbU9qL2NKOWtDQ011S0NkaGtaa2RTWWlxQXREaURxZzdxR0IyU1pER0MKejJJWHRncFBMRmNiTDNNY0RHM1F3Rnd2TTh1cVBwQloyUTExMzYrd3F0TC9jVUJOd3ZyaklpS2pUSVVHU08wRgp2MVA0aXBZSWZNRnVFTTlUa1ljb1Z6ZStMU21BYXU0TDJkVGxLUHEwa0VmZmxLVE9BZG96eThLSXpEdWk5TGFOCjY5c0h2RHRuMk5EdWtjSmNGaElhQW5XaTVpd3pPTDBoTWpvTk5uME9qN09Tdmlja1BTU1FGSWNtKzJrUDY5V1UKUGdhNGtJTG5mWjkvLzlhSGhOVkcrQ2hiYmZTcGIzVVh1WUIxNys0SlVISHNYcUdpOVkrMXFsQStTV0JTeDJWZAovOTlSc05iZG93akdjcnkycU5MUXpMSkh4RzkwSDIzUjN5aFFYUURXNUFTL3V2UjhGK2N0YmRFWG9Rc3R5UDdrCmZIMTBXbWFjSUZmeHhYakFLWlhmbzk3cjV6YmRiQkVJNGRCSjZBUW1KV1BPVWxEcmdTTHdjVHJud0JLUGRnc20KKzlCWVNmaS9lM2lZVDJWWWJWaVViZCtaeUgvSytwVTFnVWR5bUI4YzUyK0s0ZHpmOG1rU3NXOEFGSEpqNEdzOQpYOTlSWnU0eS9xS09rSkFCTk1Ob3d3UE9tQ0ZiVlErMXFnbTVvUXZvSXhyVEtnT2g0SUNoRXFLaWhlWDd1cWgrCk5rUlcxS2w3djZ0OHBLVlhrR3c2TVd3ckdWTityQjF1aUVLb2wva0JCdE5NdjA2OVVEajdSWWNZckxzQ0F3RUEKQVFLQ0FnRUExNHZwT2dVKzE2U0pFVGx0QlM3WkE2aHBVZjIrdDBBNkpRNW5KODdKMWlvaE9Ubnhha3Y5N0ZyWQpNSlhROUo1WTR4bDlCUFEzeElhWCtzUlZtbEpZRXdzYUJsanZLcnY4dUd0MjNScEN0WFlzcldOMmtNTmcxTUtkCmFSbWNWYUtDdXpxQ3JyMTFmamo2Ukt3dXlSeEM0VnNUQXcxWGxVUTVaZEY3SFJLdzlYZjRmM3k4dWlTRlF6c2YKZ3pSYzNXaGU5c1lOZERLcWl4a1UzdGJDVERNY1VFYTFJMzJGOXlocE9HSGx0S2w3bXh5L0VWemxFVmdDeW1uWQppRW4wSkZBeUxJMk5zRzZzWWRrN28vRlhhOC9ET1A5eTgrVWhZbjdBNWtHY1FSSnA0dFF5QkhYM3FGNHZhUnBwCnBvRzg0aHhkVmtyVm5sNVgwVSttWkhoT1N4RTNJYzRSUXBEeDFMeXByTTkzcHpSQWJSU1BacmRaNWhqczMvK24KbjBKRXFOWGo1QXZQZEZrUUF5SjFyL2w2ZTFyc1M5NFB3V0wwVmRpVHRJVzNjanprZEhaTmNHUHlYeWV4RjV4UApTd1JzNzVkaExBc1A0K1M4YjVPYmI1RXY0WUoySVJuKzc5ZVRiNWhaZXZ1aFdSKyt3cVRLWDlXbWhudkVDd2JIClBqeW9rQS9NYVhhZnBVTWpuYWtNTzlGUXdjVFJPNWVXem0xb1hnak1La1Nqc0d4ZGVWRWtCQjV3NmQvMWJwclAKZ0RoTkwvblBEZ0dQQ1hPamU1R05hU1lBM1dva0NYUzFwL2hoVmZLaTJpNXF3K2FmSG00Sis5NVpVcURCQmlzbgphbytqeUhkV29iS09xUXFlMTZ0TWk1RWRUSVJUVUxoL3NjUG1OZnRhZzB0S0RFMUlqMEVDZ2dFQkFQem9PcFFRCjBqSU40T3F6V0NnUi9zVkRydHdDSnhCazdqK3dTNUlXQ0w3TTVlNFlaQWxENUFDUWxrUGwxa0t3N0JzZWlQOWMKTWl1aGRXMXlDUHRyRkxKbWhOTnk4eUJEamwrQlovc3ljOW1ZUUZ1QlB5ZlM5VkR2V2g3OVRIL21sMmdMbUcvQgpWY3RLeUFBUkNObE1jRjBLeEJXZU5QQVZpdmtFcE8zbFdIUHUzRlZjeDFIN01ETEFtV0VjUmNJYThCdE9BVnpqCkRXd203cGNsNGFQamNidGkvb2VUSjJXSW92UnV0QnREU0tVYlZ6cVlxa1Y0aThjcDVINy9uSk5NblprcmR0WEUKbjYwbldaUWVhbmpjdk5xaVdKd0MyUVZkbjFRcjg2M2ZFdWpNU092VEt6K0FmUEJkT1ZQR0YvckJpeWx6ZmxUVgpuWG15VlR5OHA1RENEbThDZ2dFQkFPbDkyZlppdzlzYkN6NFd1ZWxuVDdPV09OalFtckhBTmhTNGY4bDV3YXFuCjMwRHdkUkNxNzdTMmNnOEdNeVV5cUpvb3VULzBvdnVVVVY5THpDY2xDT2hONlBlUUtCc0I2ZmdwQ1ViZ1Y4cGMKS3JrN1lrRXR5M2tRSW1uRlJzZ3Q3UjVrODZrWDB6ME53Nll1bk1mWEIzV0Z2dmZRc1pqaWNBZTJpVmRGSHVlcAplQjV2U0R3TTRrbjlTSkVkbWJ6WUNnZlByUnByVVlydXBMVUJqdUhDMGM2b2daREdMVTFveXQwZFhsTzhycWY3CjhDQXZRclBIL1Rja1FJKzduNGFKOVptWnZWM3VyVTAreDNaRmc4NURHd1hsZHVIQkoyM0crNCtsSGcvUW9wUU0Kb1I4bXFwSXArNDRFOWR1RE1hTUlnU3gwRzQ3SkJqUFE1Wi85R3dGakxIVUNnZ0VCQUtJZXorWTRmalc5OWM4ZAoxa1loZXZyREwyVXpNQTF2VmRhWDBXbTlIREFMTXQyVTN4T2RaSndFRTM5RTV6dHJKSDhoN05vZEpNQVpTU2cyCmNKR1NpL3JzZ3ZyMDlldFp3dnR2L2RMbC9hT2YyS21QeVlkaTBRVG4yaEtCZHplSi9zYWdvRUFMWkU3a0NoOFkKekY1WGhMUHdBZENGMFJPU0M3c2pnZ0pLQVpDWHJzQTlzRHZhVklSRU9FNHJESUNvT2dDVzJZTE12YjcxbWY1awpOeWVTMWtZejZFdktSZmZ0UmVDQTBvMmpiUDhCN3NIT09XQTlMUVVuMHFTaWdLRmYvS3JDVlBRbGplSTJsbEsvCnlLcmZmV1I5cTJXZTRiVngxWC9raU5tTlpSYThWWVp1b0l1ZGR2bXlHTnlkNEtOS3pFVnZGcTJWSGRSMFAvV20KVFpnYS9ac0NnZ0VCQU0rakF6bUFDdnZGeVBHbDlCNERxWFRpbWhyMUp4djYraHpqRllCdHJqTzhwV1J5Y1NncApXcEV4emF4ZXJ3emRSK0lQWk8zaTl5MFNjR3AyVlU1YU9ObWNyeGU0TW5JUithYWRsNHBYNXJvbHpEaDgvcHRICnhqSWFqdi9RVjJtY3JjamhyVzBwcXNnWWZXeEM5MWtmZDVxakhYZnpObnZtb2dtNTRkaWh0eUg4S3IybDZHNisKWmwyMXg5cUVvRHEzUS9RK1VvbXo5Z2Urd09uV1FPR3pCakRvMkkrT0xLc3lEWFVrc01WMmZUc1ZhQ3kyMm5KVgozbkF5NU5iczJxZ2g5eTVvOFdXZTRxNVdyYm9YaDJiZGRpS0FOSC85N0xwS3dWcTBVMDl0RWFibXRFR25lUGdTCkxZbldEMnp0OWk0dFdmSFdMc3VES09qYlU5ZzZsTkZmQ0NFQ2dnRUJBS05hVi9vM0pLZktURFY5cEE5QVF1MU0KZHpoNHdmQkFUdnp0b0dTK1h5QjhNNGx2ZzdhU2doK3Z3VnI1bFVSR1VUSnJEUzN0ZnBGNjFPQkFIcXc2MXVkYwpPL3ZCOEpsVU15QnpBY2xhb0RLNXlWQmpaZHFnUVlleWpUa1RqRndFcmZpYTZTK0htcmk5WkJQVzZ4dzRrTXpjClMrN0JJdVJvcVg4OUZNRnp5ZFpBcFFhaytiaTRIVWhnMjJvT3U2dFRRcEpTZWQrcnVBRkd5V0NKVENGVkVacFUKd0ZGSTRLSCtoWitUYXh3bUNyZEwrRXMxTXhXdjk2dElhMlVGYjFVTHNLVGhVQkVDUTlVQW1zVnhRSHM1L1A2UgplQTAvQ0dreld4NVo5WTVIbzdINFBDendqd1VQaEtmaWpmcWY1VHpodlRIaVFFOVVwd2tGS3FtWlcwOURpeE09Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t",
          changeapi_null_profile: "eyJzY2hlbWEiOiJodHRwczovL2F1dGgubW96aWxsYS5jb20vLndlbGwta25vd24vcHJvZmlsZS5zY2hlbWEiLCJ1dWlkIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoiY2lzIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiUFVCTElDIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOiJwdWJsaWMifSwidmFsdWUiOm51bGx9LCJ1c2VyX2lkIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoiYWNjZXNzX3Byb3ZpZGVyIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiUFVCTElDIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sInByaW1hcnlfdXNlcm5hbWUiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJjaXMiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJQVUJMSUMiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6InB1YmxpYyJ9LCJ2YWx1ZSI6bnVsbH0sImxvZ2luX21ldGhvZCI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImFjY2Vzc19wcm92aWRlciIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IlBVQkxJQyIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJhY3RpdmUiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJhY2Nlc3NfcHJvdmlkZXIiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sImxhc3RfbW9kaWZpZWQiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJjaXMiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJQVUJMSUMiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwiY3JlYXRlZCI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImNpcyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IlBVQkxJQyIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJ1c2VybmFtZXMiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWVzIjpudWxsfSwiZmlyc3RfbmFtZSI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJQVUJMSUMiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwibGFzdF9uYW1lIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IlBVQkxJQyIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJwcmltYXJ5X2VtYWlsIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoiYWNjZXNzX3Byb3ZpZGVyIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiUFVCTElDIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sImlkZW50aXRpZXMiOnsiZ2l0aHViX2lkX3YzIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwiZ2l0aHViX2lkX3Y0Ijp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwiZ2l0aHViX3ByaW1hcnlfZW1haWwiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJjdXN0b21fMV9wcmltYXJ5X2VtYWlsIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwiY3VzdG9tXzJfcHJpbWFyeV9lbWFpbCI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sImN1c3RvbV8zX3ByaW1hcnlfZW1haWwiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJtb3ppbGxpYW5zb3JnX2lkIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwiYnVnemlsbGFfbW96aWxsYV9vcmdfaWQiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJidWd6aWxsYV9tb3ppbGxhX29yZ19wcmltYXJ5X2VtYWlsIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwibW96aWxsYV9sZGFwX2lkIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6InN0YWZmIn0sInZhbHVlIjpudWxsfSwibW96aWxsYV9sZGFwX3ByaW1hcnlfZW1haWwiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5Ijoic3RhZmYifSwidmFsdWUiOm51bGx9LCJtb3ppbGxhX3Bvc2l4X2lkIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6InN0YWZmIn0sInZhbHVlIjpudWxsfSwiZ29vZ2xlX29hdXRoMl9pZCI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sImdvb2dsZV9wcmltYXJ5X2VtYWlsIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwiZmlyZWZveF9hY2NvdW50c19pZCI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sImZpcmVmb3hfYWNjb3VudHNfcHJpbWFyeV9lbWFpbCI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH19LCJzc2hfcHVibGljX2tleXMiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJsZGFwIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiUFVCTElDIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZXMiOm51bGx9LCJwZ3BfcHVibGljX2tleXMiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJsZGFwIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiUFVCTElDIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZXMiOm51bGx9LCJhY2Nlc3NfaW5mb3JtYXRpb24iOnsibGRhcCI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImxkYXAiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJQVUJMSUMiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlcyI6bnVsbH0sIm1vemlsbGlhbnNvcmciOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiUFVCTElDIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZXMiOm51bGx9LCJocmlzIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoiaHJpcyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUw6IFNUQUZGIE9OTFkiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlcyI6bnVsbH0sImFjY2Vzc19wcm92aWRlciI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImFjY2Vzc19wcm92aWRlciIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlcyI6bnVsbH19LCJmdW5fdGl0bGUiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJkZXNjcmlwdGlvbiI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sImxvY2F0aW9uIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwidGltZXpvbmUiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWUiOm51bGx9LCJsYW5ndWFnZXMiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWVzIjpudWxsfSwidGFncyI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZXMiOm51bGx9LCJwcm9ub3VucyI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sInBpY3R1cmUiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiUFVCTElDIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZSI6bnVsbH0sInVyaXMiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJtb3ppbGxpYW5zb3JnIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjpudWxsfSwidmFsdWVzIjpudWxsfSwicGhvbmVfbnVtYmVycyI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6Im1vemlsbGlhbnNvcmciLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJXT1JLR1JPVVAgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOm51bGx9LCJ2YWx1ZXMiOm51bGx9LCJhbHRlcm5hdGl2ZV9uYW1lIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoibW96aWxsaWFuc29yZyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6bnVsbH0sInZhbHVlIjpudWxsfSwic3RhZmZfaW5mb3JtYXRpb24iOnsibWFuYWdlciI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImhyaXMiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJNT1pJTExBIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjoibmRhZWQifSwidmFsdWUiOm51bGx9LCJkaXJlY3RvciI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImhyaXMiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJNT1pJTExBIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjoibmRhZWQifSwidmFsdWUiOm51bGx9LCJzdGFmZiI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImhyaXMiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJNT1pJTExBIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjoibmRhZWQifSwidmFsdWUiOm51bGx9LCJ0aXRsZSI6eyJzaWduYXR1cmUiOnsicHVibGlzaGVyIjp7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6ImhyaXMiLCJ2YWx1ZSI6IiJ9LCJhZGRpdGlvbmFsIjpbeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOm51bGwsInZhbHVlIjoiIn1dfSwibWV0YWRhdGEiOnsiY2xhc3NpZmljYXRpb24iOiJNT1pJTExBIENPTkZJREVOVElBTCIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5IjoibmRhZWQifSwidmFsdWUiOm51bGx9LCJ0ZWFtIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoiaHJpcyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6Ik1PWklMTEEgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOiJuZGFlZCJ9LCJ2YWx1ZSI6bnVsbH0sImNvc3RfY2VudGVyIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoiaHJpcyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6IldPUktHUk9VUCBDT05GSURFTlRJQUw6IFNUQUZGIE9OTFkiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6InN0YWZmIn0sInZhbHVlIjpudWxsfSwid29ya2VyX3R5cGUiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJocmlzIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiV09SS0dST1VQIENPTkZJREVOVElBTDogU1RBRkYgT05MWSIsImxhc3RfbW9kaWZpZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWF0ZWQiOiIxOTcwLTAxLTAxVDAwOjAwOjAwWiIsInZlcmlmaWVkIjp0cnVlLCJkaXNwbGF5Ijoic3RhZmYifSwidmFsdWUiOm51bGx9LCJ3cHJfZGVza19udW1iZXIiOnsic2lnbmF0dXJlIjp7InB1Ymxpc2hlciI6eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyIsIm5hbWUiOiJocmlzIiwidmFsdWUiOiIifSwiYWRkaXRpb25hbCI6W3siYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjpudWxsLCJ2YWx1ZSI6IiJ9XX0sIm1ldGFkYXRhIjp7ImNsYXNzaWZpY2F0aW9uIjoiTU9aSUxMQSBDT05GSURFTlRJQUwiLCJsYXN0X21vZGlmaWVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJjcmVhdGVkIjoiMTk3MC0wMS0wMVQwMDowMDowMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiZGlzcGxheSI6Im5kYWVkIn0sInZhbHVlIjpudWxsfSwib2ZmaWNlX2xvY2F0aW9uIjp7InNpZ25hdHVyZSI6eyJwdWJsaXNoZXIiOnsiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1MiLCJuYW1lIjoiaHJpcyIsInZhbHVlIjoiIn0sImFkZGl0aW9uYWwiOlt7ImFsZyI6IlJTMjU2IiwidHlwIjoiSldTIiwibmFtZSI6bnVsbCwidmFsdWUiOiIifV19LCJtZXRhZGF0YSI6eyJjbGFzc2lmaWNhdGlvbiI6Ik1PWklMTEEgQ09ORklERU5USUFMIiwibGFzdF9tb2RpZmllZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlYXRlZCI6IjE5NzAtMDEtMDFUMDA6MDA6MDBaIiwidmVyaWZpZWQiOnRydWUsImRpc3BsYXkiOiJuZGFlZCJ9LCJ2YWx1ZSI6bnVsbH19fQ=="
        }),
      }),
    };
  }
}

module.exports = {
  config,
  IdentityStore,
  SecretsManager,
};