import json
import os
import boto3
import uuid
from boto3 import resource
from boto3.dynamodb.conditions import Key
import datetime 
dynamodb = boto3.resource(

    'dynamodb', region_name=str(os.environ['REGION_NAME']))

dbtable = str(os.environ['DYNAMODB_TABLE'])
table = dynamodb.Table(dbtable)

def add_new_tasktype_to_employee(event, response):
  body=json.loads(event["body"])
  resp=table.put_item(
    Item={

      "pk":"emp_tasktype",
      "sk":body["empID"]+"#"+body["tasktypeID"],
      "tasktype":body["tasktype_name"],
      "date":body["date"],
      "emp_name":body["emp_name"],
      "created_at": str(datetime.datetime.utcnow()) ,
      "created_by": body["CurrentUser"],
      "modified_at": str(datetime.datetime.utcnow()) ,
      "modified_by": body["CurrentUser"]
    })
  response = {"statusCode": 200, "body": json.dumps(resp)}


  key="pk"
  value=body["tasktype_name"].lower()
  if key is not None and value is not None:
      filtering_exp = Key(key).eq(value)
      resp= table.query(KeyConditionExpression=filtering_exp)
      items = resp.get('Items')

  date_format = '%Y-%m-%d'
  with table.batch_writer() as batch:
    for item in items:
      postitem={}
      due_days=int(item["due_duration"][:-1])
      due_type=item["due_duration"][-1]
      if due_type=="a":
        due_date = datetime.datetime.strptime(body["date"], date_format) + datetime.timedelta(days=due_days)
      else:
        due_date = datetime.datetime.strptime(body["date"], date_format) - datetime.timedelta(days=due_days)

      #ADDING INDIVIDUAL ENTRIES FOR ALL TASKS OF TASKTYPE ASSIGNED TO THE EMPLOYEE TO DB  
      postitem["pk"]= body["empID"]
      postitem["sk"]=item['sk']
      postitem["taskname"]= item["task"]
      postitem["completion_status"]= "incomplete"
      postitem["due_date"]=str(due_date)
      postitem["date_of_assigning"]=body["date"]
      response_body=table.put_item(
        Item=postitem
      )      
  response={"status_code":200, "body":items}
  return response
  



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

      "created_at": str(datetime.datetime.now()),
      "created_by": body["CurrentUser"],
      "modified_at": str(datetime.datetime.now()),
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


def update_emp_tasktype(event,response):
  updated_vals=json.loads(event["body"])
  updated_tasktype=updated_vals["tasktype"]
  updated_date=updated_vals["date"]
  response = table.update_item(

        Key={
            'pk': "emp_tasktype",
            'sk': updated_vals["empID"]
            },

        UpdateExpression='SET #t = :val1 , #d=:val2',
          ExpressionAttributeValues={
            ':val1': updated_tasktype,
            ':val2': updated_date
          },
          ExpressionAttributeNames={
            "#t": "tasktype",
            '#d' : "date"
          }

    )

  return {
        'statusCode': 200,
        'body': json.dumps(response)
  }