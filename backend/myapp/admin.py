from django.contrib import admin

from .models import *

#region Test 
class TestAdmin(admin.ModelAdmin):
    list_display = ['id','test_Name', 'total_Time_for_Test_in_Minutes','deadline']
admin.site.register(Test,TestAdmin)

class TestStatementAdmin(admin.ModelAdmin):
    list_display = ['id','testId', 'statement','testOption', 'option1', 'option2', 'option3', 'option4','correct_answer']
admin.site.register(TestStatement,TestStatementAdmin)


class TestAnsAdmin(admin.ModelAdmin):
    list_display = ['id','TestId', 'QId', 'Answer']
admin.site.register(TestAns, TestAnsAdmin)    

class Comapny_detailsAdmin(admin.ModelAdmin):
    list_display= ['id','company_name','address','Job']
admin.site.register(Company_details,Comapny_detailsAdmin)    
#endregioncom

#region Job Model
class JobModelAdmin(admin.ModelAdmin):
    list_display = ['id','title','user_id','company_name','working_hours','salary','salarytype','currency','jobtype']
admin.site.register(JobModel,JobModelAdmin)
#endregion

class TestResultAdmin(admin.ModelAdmin):
    list_display = ['id','Job','Test','User', 'result', 'time_started','time_ended']
admin.site.register(TestResult, TestResultAdmin)    

class Total_ApplicationsAdmin(admin.ModelAdmin):
    list_display = ['id','title','test','user','Applicants','InProgress','Completed']
admin.site.register(Total_Applications,Total_ApplicationsAdmin)    


#region Extra

# class StudentAdmin(admin.ModelAdmin):
#     list_display = ['sid', 'name', 'roll_no']
# admin.site.register(Student, StudentAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ['Id', 'firstName', 'lastName','organization', 'emailAddress', 'password']
admin.site.register(User, UserAdmin)

#endregion