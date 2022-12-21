import json
import os
import boto3
import requests
from boto3 import resource
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource(
    'dynamodb', region_name=str(os.environ['REGION_NAME']))
dbtable = str(os.environ['DYNAMODB_TABLE'])

table = dynamodb.Table(dbtable)



def emp_by_task_type(event,response):
  
  emp_by_tasktype={}
  key="pk"
  token = str(event['headers']['authorization'].split(" ")[1])
  
  r = requests.get('https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/task-type/getAll', headers={'Authorization': token})
  tasktypes = r.json() 
  # tasktypes=["onboarding", "offboarding"]
  for tasktype in tasktypes:
    response = table.query(
        KeyConditionExpression=Key(key).eq(tasktype)
    )
    
    emp_by_tasktype[tasktype]=response.get('Items')
  
  
  
  return {"status_code":200, "response": emp_by_tasktype}



def get_all_employees(event,response):
    key="pk"
    value='employee'
    tasks=[]
    
    if key is not None and value is not None:
      filtering_exp = Key(key).eq(value)
      resp= table.query(KeyConditionExpression=filtering_exp)
         
      items = resp.get('Items')
         
      response = {"statusCode": 200,
                'headers': {
                  'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": '*',
             
                },
                "body":json.dumps(items)}
    return response
  
  
