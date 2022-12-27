import json
import botocore.exceptions
from logging import Logger
import boto3
import os
import boto3
import requests
from boto3 import resource
from boto3.dynamodb.conditions import Key
import uuid
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
        KeyConditionExpression=Key(key).eq(tasktype['sk'])
    )
    
    emp_by_tasktype[tasktype]=response.get('Items')
  
  
  
  return {"status_code":200, "response": emp_by_tasktype}



def get_all_employees(event,response):
    key="pk"
    value='employee'
    
    
    if key is not None and value is not None:
      filtering_exp = Key(key).eq(value)
      resp= table.query(KeyConditionExpression=filtering_exp)
         
      items = resp.get('Items')
      for i in items:
        [tasktype, emp_id]=i['sk'].split("#")
        i["tasktype"]=tasktype
        i["emp_id"]=emp_id   
      response = {"statusCode": 200,
                'headers': {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': '*'
        },
                "body":json.dumps(items)}
    return response
  

def create_new_employee(event,response):
  body=json.loads(event["body"])
  resp=table.put_item(
    Item={
      "pk":"employee",
      "sk":body["tasktype"]+"#"+str(uuid.uuid4()),
      "phone":body["phone"],
      "name":body["name"],
      "email":body["email"],
      "profile":body["profile"],
      "date_of_event":body["date_of_event"]
          }
  )
  response = {"statusCode": 200,
                "body":json.dumps(resp),
                "message":"put_success"}
  return response

def get_all_admins(event,response):
    cognito_idp_client =boto3.client('cognito-idp')
    user_pool_id = "ap-south-1_sQeBGTxl8"
    client_id = "48hko2q1qsd36p6d3kcrla334j"
    client_secret=None
    admin_list=[]
    try:
        response = cognito_idp_client.list_users(UserPoolId=user_pool_id,  AttributesToGet=[
            'name'
        ])
        users = response['Users']
        for i in users:
            for j in i["Attributes"]:
                admin_list.append(j['Value'])

    except ClientError as err:
        Logger.error(
            "Couldn't list users for %s. Here's why: %s: %s", user_pool_id,
            err.response['Error']['Code'], err.response['Error']['Message'])
        raise
    else:
        response={"statusCode":200,
        "body": json.dumps(admin_list)}
        return response    