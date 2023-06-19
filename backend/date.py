import datetime
import pandas as pd
 


# date={date1:"07-2023"}

# initializing date
# test_date = datetime.datetime.strptime(date, "%m-%Y")
 
# initializing K
K = 8

date_generated = pd.date_range("07-2023",freq="MS", periods=K)
print(date_generated)
df=pd.DataFrame({'Date':date_generated.strftime("%m-%Y")})
list = df.to_dict()
val=list.items()
print(val) 
print(type(list))

for v in list.values():
    print(v)
dates=v
carousal=[]
for value in dates.values():
    carousal.append(value)
print(carousal)

# for key,value in list.items():
#     print("\nstardate:",key)
#     for key in value:
#         print(key + ':', value[key])
# print(df)
# print(type(df))
# print(date_generated.strftime("%m-%Y"))

# from datetime import date, timedelta

# current_date = date.today().isoformat()   
# days_before = (date.today()-timedelta(days=30)).isoformat()
# days_after = (date.today()+timedelta(days=30)).isoformat()  

# print("\nCurrent Date: ",current_date)
# print("30 days before current date: ",days_before)
# print("30 days after current date : ",days_after)

# import datetime
# # from dateutil.relativedelta import relativedelta
# from dateutil.relativedelta import *
 
# start = datetime.date(2022,8,12)
 
# # initializing K
# K = 5
 
# res = []
 
# for day in range(K):
#     date = (start + datetime.timedelta(6*365/12)).strftime("%m-%Y")
#     res.append(date)
     
# # printing result
# print(str(res))