import json
import os
import boto3
from boto3 import resource
from boto3.dynamodb.conditions import Key
from datetime import datetime

dynamodb = boto3.resource(
    'dynamodb', region_name=str(os.environ['REGION_NAME']))
dbtable = str(os.environ['DYNAMODB_TABLE'])

table = dynamodb.Table(dbtable)


def get_all_task_types(event,context):
    key="pk"
    value='tasktype'
    tasks=[]
    
    if key is not None and value is not None:
      filtering_exp = Key(key).eq(value)
      resp= table.query(KeyConditionExpression=filtering_exp)
         
      items = resp.get('Items')
         
      for i in items:
          tasks.append(i['sk'])
      tasks=list(set(tasks))
    
    response = {"statusCode": 200, "body": json.dumps(tasks)}  

    # return response
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(tasks),
        'isBase64Encoded': False,
    }
  
def  add_new_task_type(event, response):
  body=json.loads(event["body"])
  resp=table.put_item(
    Item={
      "pk":"tasktype",
      "sk":body["tasktype"],
      "created_at": datetime.now(),
      "created_by": body["CurrentUser"],
      "modified_at": datetime.now(),
      "modified_by": body["CurrentUser"]
    }
  )
  response = {"statusCode": 200, "body": resp}
  return response
  
     
     
     
     