from email.policy import default
from turtle import title
from django.db import models

class User(models.Model):
    Id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50,null='True')
    organization = models.CharField(max_length=100,null='True')
    emailAddress = models.CharField(max_length=100)
    password = models.CharField(max_length=50)

    class Meta:
        ordering = ['Id']
#region Test   
class Test(models.Model):
    id = models.AutoField(primary_key=True)
    test_Name = models.CharField(max_length=255)
    description = models.TextField()
    total_Time_for_Test_in_Minutes = models.IntegerField()
    deadline = models.DateField(auto_now=False, auto_now_add=False)
    def __str__(self):
        return self.test_Name
    class Meta:
        ordering = ['id']
             
class TestStatement(models.Model):
    id = models.AutoField(primary_key=True)
    testId= models.ForeignKey(Test, on_delete=models.CASCADE)
    statement = models.CharField(max_length=255)
    testOption = models.BooleanField(default=False)
    option1 = models.CharField(null=True, blank=True,max_length=255)
    option2 = models.CharField(null=True, blank=True,max_length=255)
    option3 = models.CharField(null=True, blank=True,max_length=255)
    option4 = models.CharField(null=True, blank=True,max_length=255)
    correct_answer = models.CharField(null=True, blank=True,max_length=255,help_text="Be careful while adding answer. It should match the option exacty")
    
    def __str__(self):
        return self.statement
    class Meta:
        ordering = ['testId']


class TestAns(models.Model):
    id = models.AutoField(primary_key=True)
    TestId = models.ForeignKey(Test, on_delete=models.CASCADE)
    QId = models.ForeignKey(TestStatement, on_delete=models.CASCADE)
    # UserId = models.ForeignKey(User, on_delete=models.CASCADE)
    Answer = models.CharField(max_length=5000)

    class Meta:
        ordering = ['TestId']

    

    
#endregion

#region Job Models
JOB_TYPE=(
    ("Full-Time","Full-Time"),
    ("Part-Time","Part-Time"),
    ("Internship","Internship"),
)
CURRENCY_TYPE=(
    ("Rs/-","Rs/-"),
    ("$","$"),
    ("€","€"),
)
SALARY_TYPE=(
    ("Per Year","Per Year"),
    ("Per Month","Per Month"),
   
)
STATUS_APPLICATION=(
   
    ("Completed","Completed"),
    ("Started","Started"),
)


class JobModel(models.Model):
    id=models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User,null='True', on_delete=models.CASCADE)
    title=models.CharField(max_length=255,)
    company_name=models.CharField(max_length=255,null='True')
    description=models.TextField() 
    working_hours=models.IntegerField()
    tests=models.ManyToManyField(Test,related_name="jobs")
    salary=models.IntegerField()
    salarytype=models.CharField(
        choices=SALARY_TYPE,
        default="per year",
        max_length=255,

    )
    currency=models.CharField(
        choices=CURRENCY_TYPE,
        default="rupee",
        max_length=255,

    )

    jobtype=models.CharField(
        max_length = 20,
        choices=JOB_TYPE,
        default="full-time",
    )
    class Meta:
        ordering=['id']
        
   
class TestResult(models.Model):
    
    Job = models.ForeignKey(JobModel, on_delete=models.CASCADE)
    Test = models.ForeignKey(Test, on_delete=models.CASCADE)
    User = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    result = models.IntegerField()
    time_started=models.DateTimeField()
    time_ended=models.DateTimeField()

    # class Meta:
    #     ordering = ['id']
class Company_details(models.Model):
   id=models.AutoField(primary_key=True)
   company_name=models.CharField(max_length=255)
   address=models.TextField()
   #addition of tests added by this company
   #addition of jobs posted by this company
   Job = models.ForeignKey(JobModel, on_delete=models.CASCADE) 
#endregion  iI

class Total_Applications(models.Model):
    id=models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    title = models.ForeignKey(JobModel,on_delete=models.CASCADE,null=True, related_name ='job')
    test = models.ForeignKey(Test,on_delete=models.CASCADE,null=True)
    Applicants = models.IntegerField(null=True)
    InProgress = models.IntegerField(null=True)
    Completed = models.IntegerField(null=True)
   # Status=models.CharField(
    #    choices=STATUS_APPLICATION,
     #   default="--",
      #  max_length=255,

    #)
# class Student(models.Model):
    
#     sid = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=50)
#     roll_no = models.IntegerField()

#     class Meta:
#         ordering = ['roll_no']
