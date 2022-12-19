import json
import os
from boto3 import resource
from boto3.dynamodb.conditions import Key


dynamodb_resource = resource('dynamodb')
table_name = str(os.environ['DYNAMODB_TABLE'])

def get(event,context):
    key="pk"
    value='task'
    tasks=[]
    table = dynamodb_resource.Table(table_name)
    if key is not None and value is not None:
      filtering_exp = Key(key).eq(value)
      resp= table.query(KeyConditionExpression=filtering_exp)
         
      items = resp.get('Items')
      print(len(items))
      
      for i in items:
          tasks.append(i['sk'].split("#")[0])
      tasks=list(set(tasks))
    
    response = {"statusCode": 200, "body": json.dumps(tasks)}  

    return response
     