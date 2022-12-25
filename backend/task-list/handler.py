
import json
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

def add_new_task(event,context):
    body = json.loads(event['body'])
    for eItem in body :
        taskid="task"+str(uuid.uuid4())
        response = table.put_item(
            Item={
                "pk": eItem["tasktype"],
                "sk": taskid,
                "assignee": eItem["owned_by"],
                "created_at": eItem["created_at"],
                "created_by": eItem["CurrentUser"],
                "due_duration": eItem["due_duration"],
                "task":eItem["task"],
                "task_description":eItem["task_description"],
                "viewed_by": "None"   
            }
        )
    response = {"statusCode": 200, "body": json.dumps({"message" : "post success"})}

    return response



def get_tasks_by_tasktype(event, context):
    
    body = event['pathParameters']['type'] 
     
    key="pk"
    value=body

    if key is not None and value is not None:
      filtering_exp = Key(key).eq(value)
      resp= table.query(KeyConditionExpression=filtering_exp)
         
      items = resp.get('Items')
   
   
    return {

        'statusCode': 200,

        'headers': {'Content-Type': 'application/json',

                    'Access-Control-Allow-Origin': '*',

                      'Access-Control-Allow-Methods': '*'

        },

        'body': json.dumps(items),


        'isBase64Encoded': False,

    }    
