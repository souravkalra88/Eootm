export const environment = {
    
    cognitoUserPoolId: 'ap-south-1_sQeBGTxl8',
    cognitoAppClientId: '48hko2q1qsd36p6d3kcrla334j',
    idToken : '',
    currentUser: "",
    currentUserName: ""

}

export const urls = {
    getTaskByTaskType : "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/tasks_by_tasktype",
    getAllTasks : "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/task-type/getAll",
    getAllEmployees:"https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/allemp",
    createNewEmployee:"https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/newemp",
    addTaskType:"https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/addTaskType",
    UpdateTaskType: "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/update_tasktype",
    addNewTask: "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/addTask",
    getAllAdmins:"https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/get_all_admins"
}