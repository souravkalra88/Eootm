import json

import os

import boto3
import uuid
from boto3 import resource
import requests
from boto3.dynamodb.conditions import Key

from datetime import datetime



dynamodb = boto3.resource(

    'dynamodb', region_name=str(os.environ['REGION_NAME']))

dbtable = str(os.environ['DYNAMODB_TABLE'])



table = dynamodb.Table(dbtable)


# def get_tasktype_by_empID(event,response):
#   empID=event["pathParameters"]["empID"]
#   records = table.query(KeyConditionExpression="pk=:pk and begins_with(sk,:sk)",
#                         ExpressionAttributeValues={':pk':'emp_tasktype',':sk':empID})['Items']

  
#   return {

#         'statusCode': 200,

#         'headers': {'Content-Type': 'application/json',

#                     'Access-Control-Allow-Origin': '*',

#                       'Access-Control-Allow-Methods': '*'

#         },

#         'body': json.dumps(records),


#         'isBase64Encoded': False,

#     }
        



# def add_new_tasktype_to_employee(event, response):
#   body=json.loads(event["body"])
#   tasktype=body["tasktype"]
#   token = str(event['headers']['authorization'].split(" ")[1])
  
#   tasklist= requests.get('https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/task-list/tasks_by_tasktype/{}'.format(tasktype), headers={'Authorization': token})

#   with table.batch_writer() as batch:

#     for item in tasklist:
#         data={

#         }
#         batch.put_item(
#             Item=item
#         )
#   # response = table.put_item(

#   #   Item={

#   #     "pk":"tasktype",

#   #     "sk":tasktype_id,
#   #     "tasktype_name":body["tasktype"],

#   #     "created_at": "5454894",
#   #     "created_by": body["CurrentUser"],
#   #     "modified_at": "6459848",
#   #     "Description": body["description"],
#   #     "modified_by": body["CurrentUser"]

#   #   }

#   # )
#   response = {"statusCode": 200, "body": json.dumps(resp)}
#   return response



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
      d["sk"]=i["sk"]
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
  tasktype_id=str(uuid.uuid4())
  resp=table.put_item(

    Item={

      "pk":"tasktype",

      "sk":tasktype_id,
      "tasktype_name":body["tasktype"],

      "created_at": datetime.now(),
      "created_by": body["CurrentUser"],
      "modified_at": datetime.now(),
      "Description": body["description"],
      "modified_by": body["CurrentUser"]

    }

  )
  response = {"statusCode": 200, "body": json.dumps(resp)}
  return response
  
def update_tasktype(event,context):
  # event=json.loads(event)
  updated_vals=json.loads(event["body"])
  
  response = table.update_item(

        Key={
            'pk': "tasktype",
            'sk': updated_vals["sk"]
            },

        UpdateExpression = 'SET tasktype_name = :val1 , Description=:val2',

        ExpressionAttributeValues={

            ':val1': updated_vals['tasktype'],
            ':val2': updated_vals['description']
        }

    )

  # return event
  return {
        'statusCode': 200,
        'body': json.dumps(response)
  }


