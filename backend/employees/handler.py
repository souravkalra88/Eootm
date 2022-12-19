import json
import os
import boto3
import requests
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('EOOMT')

import decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

def empByTaskType(event,response):
  
  emp_by_tasktype={}
  key="pk"
  # token = str(event['headers']['authorization'].split(" ")[1])
  token = 'eyJraWQiOiJjZ1pSelhqdDl6TTNPMDNIOG9mblJlcEdWenN4Y0RUTXJvV09CZTFHaUVrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmZWFiM2MyZS0zOTUzLTQwZWQtYmFhOC1jZjQyYWJmNzM5ZTQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImdlbmRlciI6Ik1hbGUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX3NRZUJHVHhsOCIsImNvZ25pdG86dXNlcm5hbWUiOiJmZWFiM2MyZS0zOTUzLTQwZWQtYmFhOC1jZjQyYWJmNzM5ZTQiLCJvcmlnaW5fanRpIjoiMGU4NDVlMTYtZTYwNC00NzIxLWI3YzgtZTc5ZmMyZjE4ODNiIiwiYXVkIjoiNDhoa28ycTFxc2QzNnA2ZDNrY3JsYTMzNGoiLCJldmVudF9pZCI6ImFjYzA5YmVlLTE2MjctNDI2NC1hOTljLTdmOTY4NDYzM2EyMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjcxNDQ5MTg5LCJuYW1lIjoiU291cmF2IiwiZXhwIjoxNjcxNDUyNzg5LCJpYXQiOjE2NzE0NDkxODksImp0aSI6ImNlOTNlZmRiLTQxMTgtNDYxOS05YTIwLWZjYjJmYmQyMGM3MSIsImVtYWlsIjoic291cmF2a2FscmE0MzBAZ21haWwuY29tIn0.gfn_cu4SJi3GMQlbJSb4699R0lPdO3uzCHcWD0wO1a_C9ZT0dSfXVr0xlMG89-OUsVN5Lk5x8tRuTen7fwms7L7BamhfSG2kQ4hZo8_JVlKCBbfwMP-PpfMYLdnEd5IQUocX5UEdh3FnnNxTqL9xiw88qkggWmoX7Q7txGbyvFdapEh-iJ92xP8-06iqLG-0AkkOrYYvP64-nj3aiUU_ELiOU5jDF38akdKDRbZRmXK7_k4MzL7lmVrBjVHLlmsWa4Aviy6T00GGRGHqUQEnG53-rz0LPbI4qCV3kSwxrLkG-l-Pc6CbWpymVtLdXIngfd2OI1f_k0rpSgcwrkQdww'
  r = requests.get('https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/task-type/getAll', headers={'Authorization': token})
  tasktypes = r.json() 
  # tasktypes=["onboarding", "offboarding"]
  for tasktype in tasktypes:
    response = table.query(
        KeyConditionExpression=Key(key).eq(tasktype)
    )
    
    emp_by_tasktype[tasktype]=response.get('Items')
 
  return {"status_code":200, "response": json.dumps(emp_by_tasktype,cls=DecimalEncoder)}



print(empByTaskType({} , {}))