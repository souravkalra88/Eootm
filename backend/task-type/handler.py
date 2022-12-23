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
    
    tasktypes=[]     
    
    
    for i in items:
      print(i)
      d={}
      d["tasktype"]=i['tasktype_name']
      d["description"]=i['Description']
      tasktypes.append(d)

    return {

        'statusCode': 200,

        'headers': {'Content-Type': 'application/json',

                    'Access-Control-Allow-Origin': '*',

                      'Access-Control-Allow-Methods': '*'

        },

        'body':json.dumps(tasktypes),


        'isBase64Encoded': False,

    }

  
  
  
def add_new_task_type(event, context):

  body=json.loads(event["body"])

  resp=table.put_item(

    Item={

      "pk":"tasktype",

      "sk":body["tasktype"],

      "created_at": "5454894",
      "created_by": body["CurrentUser"],
      "modified_at": "6459848",
      "description": body["description"],
      "modified_by": body["CurrentUser"]

    }

  )
  response = {"statusCode": 200, "body": json.dumps(resp)}
  return response
  

def update_tasktype(event,context):
  body=json.loads(event)
  response = table.update_item(

        Key={
            'pk': "tasktype",
            'sk': '1324z25x4udh356'
            },

        UpdateExpression = 'SET created_at = :val1 ',

        ExpressionAttributeValues={

            ':val1': "awanti"
         }

    )

  return {
        'statusCode': 200,
        'body': json.dumps(response)
   }