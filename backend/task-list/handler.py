from datetime import datetime

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
    response = table.put_item(
        Item={
            "pk": body["tasktype"],
            "sk": body["taskname"],
            "assignee": body["assignee"],
            "created_at": datetime.now(),
            "created_by": body["CurrentUser"],
            "due_duration": body["due_duration"]         
        }
    )
    response = {"statusCode": 200, "body": "post success"}

    return response



def get_tasks_by_tasktype(event, context):
    
    body = event['pathParameters']['type'] 
     
    key="pk"
    value=body

    if key is not None and value is not None:
      filtering_exp = Key(key).eq(value)
      resp= table.query(KeyConditionExpression=filtering_exp)
         
      items = resp.get('Items')
    tasks=[]
    for i in items:
        d={}
        d["task"]=i["task"]
        d["task_description"]=i["task_description"]
        d["owned_by"]=i["owned_by"]
        d["completion duration"]=i["task"]
        tasks.append(d)
   
    return {

        'statusCode': 200,

        'headers': {'Content-Type': 'application/json',

                    'Access-Control-Allow-Origin': '*',

                      'Access-Control-Allow-Methods': '*'

        },

        'body': json.dumps(tasks),


        'isBase64Encoded': False,

    }    
