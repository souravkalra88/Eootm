import json
import os
import boto3
import requests
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('EOOMT')

import decimal


def empByTaskType(event,response):
  
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



