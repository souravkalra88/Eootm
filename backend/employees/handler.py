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
      emp_response=[]
      print(items)
      for i in items:
        l=[]   
        emp_id=i['sk']
        records = table.query(KeyConditionExpression="pk=:pk and begins_with(sk,:sk)",
                              ExpressionAttributeValues={':pk':'emp_tasktype',':sk':emp_id})['Items']
        for rec in records:                      
            l.append(rec.get('tasktype'))


        i['tasktype']=l[0]
        emp_response.append(i)
        for j in range(1,len(l)):
          new=i.copy()
          new['tasktype']=l[j]
          emp_response.append(new)
                                      

    response = {"statusCode": 200,
                'headers': {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': '*'
        },
                "body":json.dumps(emp_response)}
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

def get_all_users(event,response):

  cognito_idp_client =boto3.client('cognito-idp')

  user_pool_id = "ap-south-1_sQeBGTxl8"

  client_id = "48hko2q1qsd36p6d3kcrla334j"

  client_secret=None

   

  cognito = boto3.client('cognito-idp')

   

  list = []

  users= []

  next_page = None

  kwargs = {

        'UserPoolId': user_pool_id

    }



  users_remain = True

  while(users_remain):

      if next_page:

          kwargs['PaginationToken'] = next_page

      response = cognito.list_users(**kwargs)

      users.extend(response['Users'])

      next_page = response.get('PaginationToken', None)

      users_remain = next_page is not None

       

  for i in users:

      item = {}

      for j in i["Attributes"]:

           

          item.update({j['Name'] :j['Value']} )  

      list.append(item)    

   

  response={"statusCode":200, "body": json.dumps(list, indent=4, sort_keys=True, default=str)}
  return response  
 


def deleteUser(event , response):
  client = boto3.client('cognito-idp')
  user_pool_id = "ap-south-1_sQeBGTxl8"
  user_name = str(event['pathParameters']['user_name'])
  response = client.admin_delete_user(
    UserPoolId=user_pool_id,
    Username=user_name
    )
    
  return {"statusCode":200, "body": json.dumps("User Deleted")}


def updateUser(event,response):
  client = boto3.client('cognito-idp')
  body=json.loads(event["body"])
  response = client.admin_update_user_attributes(
    UserPoolId='ap-south-1_sQeBGTxl8',
    Username= body['username'] ,
    UserAttributes= body['attributes'],
    ClientMetadata={
        'string': 'string'
    }
)
  return {"statusCode":200, "body": json.dumps(response)}