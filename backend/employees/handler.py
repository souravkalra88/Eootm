import json
import os
import boto3
from boto3 import resource
from boto3.dynamodb.conditions import Key
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('EOOMT')

def empByTaskType(event,response):
  
  emp_by_tasktype={}
  key="pk"
  tasktypes=["onboarding", "offboarding"]
  for tasktype in tasktypes:
    response = table.query(
        KeyConditionExpression=Key(key).eq(tasktype)
    )
    
    emp_by_tasktype[tasktype]=response.get('Items')
        

  return {"status_code":200, "response": emp_by_tasktype}