from email.mime import application
from glob import escape
import json
from django.http import HttpResponse
from .serializer import *
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse


from .models import *

#region extra
# def st_ind(request):
#     students = []
#     data = Student.objects.all()
#     for student in data:
#         student=StudentSerializers(student).data
#         students.append(student)
#     return HttpResponse(json.dumps(students))

# @csrf_exempt
# def addStudent(request):
#     data = request.body
#     data = json.loads(data)

#     name = data['name']
#     roll = data['roll']
#     # print(data)
#     if Student.objects.filter(name = name).exists():
#         return HttpResponse('Student already exists')
#     else:
#         student = Student.objects.create(name=name, roll_no=roll)
#         student.save()
#         return HttpResponse('Student added')

#endregion

#region user
def getUsers(request):
    users = []
    data = User.objects.all()
    for user in data:
        user=UserSerializers(user).data
        users.append(user)
    return HttpResponse(json.dumps(users))

# ---------------------Add User----------------------
@csrf_exempt
def addUser(request):
    data = request.body
    data = json.loads(data)

    firstName = data['firstName']
    lastName = data['lastName']
    emailAddress = data['emailAddress']
    password = data['password']
    organization = data['o']
    if User.objects.filter(emailAddress = emailAddress).exists():
        return HttpResponse('User already exists')
    else:
        user = User.objects.create(firstName=firstName, lastName=lastName, organization=organization,emailAddress=emailAddress, password=password)
        user.save()
        return HttpResponse('User added successfully')


#------------------jobs posted by a company-------------
def getJobPostedByCompany(request,pk): #getting id of comapny and request from the frontend
    jobs= [] #storing all jobs posted by the comapny
    a1 = User.objects.get(id=pk)
    userx = User.objects.get(id=pk)
    jobdata = userx.jobdata.all()                               #matching the frontends id is equal to the backend id
    
    for user in jobdata:
        jobdata = JobModel.objects.filter(id=pk)
        if(jobdata.id==pk):
            user=UserSerializers(user).data
        jobs.append(user)
    return HttpResponse(json.dumps(jobs))        
           
        
    #for test in data:
     #       qdata = TestStatement.objects.filter(testId = test)
      #      if qdata.exists():
       #         for qs in qdata:
        #            qs=TestStatementSerializers(qs).data
         #           Questions.append(qs)
          #  test=TestSerializers(test).data
           # test["Questions"]=Questions
            #Questions=[]
            
       
    
    
        
    



#---------------------Validate User---------------------
@csrf_exempt
def validateUser(request):
    data = request.body
    data = json.loads(data)

    emailAddress = data['emailAddress']
    password = data['password']
    
    data1 = User.objects.filter(emailAddress = emailAddress)
    if data1.exists():
        if(data1[0].password==password):
            result=UserSerializers(data1[0]).data
            return HttpResponse(json.dumps(result))

            # return HttpResponse(data1.values())
        else:
            return HttpResponse('Password not matched')
    else:
        return HttpResponse('Email not found')

#endregion

#region test
def getTests(request):
    Questions=[]
    tests = []
    data = Test.objects.all()
    for test in data:
        qdata = TestStatement.objects.filter(testId = test.id)
        if qdata.exists():
            for qs in qdata:
                qs=TestStatementSerializers(qs).data
                Questions.append(qs)
        test=TestSerializers(test).data
        test["Questions"]=Questions
        Questions=[]
        tests.append(test)

    return HttpResponse(json.dumps(tests))

def getTestbyId(request,pk):
    Questions=[]
    data = Test.objects.filter(id = pk)
    if data.exists():
        qdata = TestStatement.objects.filter(testId = data[0])
        if qdata.exists():
            for qs in qdata:
                qs=TestStatementSerializers(qs).data
                Questions.append(qs)
        result=TestSerializers(data[0]).data
        result["Questions"]=Questions
        return HttpResponse(json.dumps(result))
    else:
        return HttpResponse('Test not found')
    
def getJobByUserID(request,pk):
    allJobs=[]
    data=User.objects.filter(Id=pk)
    if data.exists():
        jdata = JobModel.objects.filter(user_id= data[0]) 
        for js in jdata:
            js= JobModelSerializers(js).data
            allJobs.append(js)
    result=UserSerializers(data[0]).data
    result["alljobs"]=allJobs
    return HttpResponse(json.dumps(result)) 

def getStatusbyJob(request,pk):
    allStatus=[]
    data=JobModel.objects.filter(id=pk)   
    if data.exists():
        sdata = Total_Applications.objects.filter(title=data[0])
        for sd in sdata:
            sd = Total_ApplicationsSerializers(sd).data
            allStatus.append(sd)
    result= JobModelSerializers(data[0]).data
    result["allStatus"]=allStatus
    return HttpResponse(json.dumps(result))
        

def getTestbyJob(request,pk):
    Tests=[]
    Questions=[]
    
    try:
        a1 = JobModel.objects.get(id=pk)
        data=a1.tests.all()
        for test in data:
            qdata = TestStatement.objects.filter(testId = test)
            if qdata.exists():
                for qs in qdata:
                    qs=TestStatementSerializers(qs).data
                    Questions.append(qs)
            test=TestSerializers(test).data
            test["Questions"]=Questions
            Questions=[]
            Tests.append(test)
        return HttpResponse(json.dumps(Tests))
    except ObjectDoesNotExist:
        return HttpResponse("Tests not found")


@csrf_exempt
def addTest(request):
    data = request.body
    data = json.loads(data)
    TestName=data['TestName']
    TotalTime= data['TotalTime']
    Deadline=data ['Deadline']
    TestDescription=data ['TestDescription']
    Questions=data['Questions']
    test = Test.objects.create(test_Name=TestName,total_Time_for_Test_in_Minutes= TotalTime,deadline= Deadline,description= TestDescription)
    test.save()
    TestId = Test.objects.latest('id')
    print(TestId)
    for q in Questions:
        question = TestStatement.objects.create(testId=TestId,statement= q['Statement'],testOption= q['testOption'],option1= q['option1'],option2= q['option2'],option3= q['option3'],option4= q['option4'],correct_answer= q['answer'])
        question.save()
    return HttpResponse('Test added successfully')



@csrf_exempt
def addTestAns(request):
    data = request.body
    data = json.loads(data)
    Answer=data['answer']
    Testid= data['Tid']
    Qid=data ['Qid']
    test = Test.objects.get(id = Testid)
    testStatement = TestStatement.objects.get(id = Qid)
    question = TestAns.objects.create(TestId=test,QId= testStatement,Answer=Answer)
    question.save()
    return HttpResponse('Test Completed')

@csrf_exempt
def addApplicationStatus(request):
    data=request.body
    data=json.loads(data)
    Status=data['Status']
    Testid=data['Test']
    Userid=data['User']
    Jobid=data['Job']
    InProgress=data['InProgress']
    Completed=data['Completed']
    Applicants=data['Applicants']
    test = Test.objects.get(id=Testid)
    job =JobModel.objects.get(id=Jobid)
    user=User.objects.get(id=Userid)
    application_status = Total_Applications.objects.create(Status=Status,test=test,job=job,user=user,Applicants=Applicants,InProgress=InProgress,Completed=Completed)
    application_status.save()
    return HttpResponse('ApllicationStatus Updated')
    

@csrf_exempt
def addTestResults(request):
    data = request.body
    data = json.loads(data)
    JobId=data['JobId']
    TestId= data['TestId']
    UserId=int(data['UserId'])
    result=data['result']
    timeStarted= data['time_started']
    timeEnded=data['time_ended']
    user = User.objects.get(Id = UserId)
    test = Test.objects.get(id = TestId)
    job = JobModel.objects.get(id = JobId)
    test_result = TestResult.objects.create(Job=job,Test=test,User= user,result=result,time_started=timeStarted,time_ended=timeEnded)
    test_result.save()
    return HttpResponse('Test Completed')

#endregion

#region job model
def getJobs(request):
    jobs = []
    data = JobModel.objects.all()
    for job in data:
        job=JobModelSerializers(job).data
        jobs.append(job)
    return HttpResponse(json.dumps(jobs))

def getallPostedJobs(request):
    applications = []
    
    data = Total_Applications.objects.all()
    for application in data:
        application=Total_ApplicationsSerializers(application).data
        applications.append(application)
    return HttpResponse(json.dumps(applications))    


@csrf_exempt
def addJob(request):
    
    data = request.body
    data = json.loads(data)
    title=data['title']
    description= data['desc']
    company_name=data ['companyName']
    working_hours=int(data['hours'])
    salary=data ['salary']
    salarytype =data['salarytype']
    currency=data ['currency']
    jobtype=data ['jobtype']
    tests=data ['test']
    
    
 
    job = JobModel.objects.create(title=title,description= description,company_name= company_name,working_hours= working_hours,salary=salary,salarytype= salarytype,currency= currency,jobtype= jobtype)
    
    job.save()
    for t in tests:
        test = Test.objects.get(id = t['id'])
        
        job.tests.add(test)
    return HttpResponse('Job added')

@csrf_exempt
def editJob(request):
    data = request.body
    data = json.loads(data)
    Id=data['id']
    title=data['title']
    description= data['desc']
    company_name=data ['companyName']
    working_hours=data ['hours']
    salary=data ['salary']
    salarytype =data['salarytype']
    currency=data ['currency']
    jobtype=data ['jobtype']
    test=data['test']
    print(data)
    JobModel.objects.filter(id=Id).update(title=title,description= description,company_name= company_name,working_hours= working_hours,salary=salary,test=test,salarytype= salarytype,currency= currency,jobtype= jobtype)

    return HttpResponse('Job Edited Successfully')

#endregion