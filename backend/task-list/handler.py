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
    bod = json.loads(event['body'])
    response = table.put_item(
        Item={
            "pk":bod['task_type'],
            "sk":bod['task_name'],
            
            "description":bod['task_description']
            
        }
    )
    
    response = {"statusCode": 200, "body": json.dumps(response)}

    return response
