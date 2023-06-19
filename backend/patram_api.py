
# imports:
from flask import Flask, request, jsonify,app
import mysql.connector 
from flask_mail import Mail, Message  
import re
from dateutil.relativedelta import relativedelta
from unittest import result
from datetime import date
import datetime
import pandas as pd
from flask_mysqldb import MySQL   
from flask_cors import CORS
 
app = Flask(__name__)
mail = Mail(app)
CORS(app)  # Enable CORS for all routes and origins

# mysql connection:

mydb = mysql.connector.connect(
  user ='admin',
  password= 'admin123',
  host= 'patram-subscription-db.c4qldlczzvrr.us-east-1.rds.amazonaws.com',
  database= 'patram')  
mysql = MySQL(app)

# gmail server connection :   
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465    
app.config['MAIL_USERNAME'] = 'reddytharun152@gmail.com'
app.config['MAIL_PASSWORD'] = "avlgjvlrwevezskv"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True    
mail = Mail(app)
    
@app.route('/Counts', methods=['POST'])

def Get_Range_Of_Renewal():
    try:
        _Act = request.json['startDate']
        if _Act and request.method == 'POST':  
            # today = datetime.date.today()
            result = {}
            start_date = datetime.datetime.strptime(_Act, "%Y-%m")

            target_date = start_date - relativedelta(months=2)
            for i in range(-2, 10):  
                target_month = target_date.strftime("%Y-%m")
                sql_query = """
                SELECT
                    (SELECT COUNT(id) FROM subsription_payment WHERE DATE_FORMAT(Subscription_End, '%Y-%m') = %s) AS Expired,
                    (SELECT COUNT(id) FROM subsription_payment WHERE DATE_FORMAT(Subscription_Start, '%Y-%m') = %s) AS Re_new,
                    (SELECT COUNT(id) FROM subsription_payment WHERE DATE_FORMAT(Subscription_Start, '%Y-%m') <= %s AND DATE_FORMAT(Subscription_End, '%Y-%m') >= %s) AS Active
                """
                cursor = mydb.cursor(dictionary=True)
                cursor.execute(sql_query, [target_month, target_month, target_month, target_month])
                row = cursor.fetchone()
                result[target_month] = {
                    "Expired": row['Expired'],
                    "Re_new": row['Re_new'],
                    "Active": row['Active']
                }
                target_date += relativedelta(months=1)
            return jsonify(result)
        else:
            return showMessage()
    except Exception as e:
        return f"Exception Occurred: {str(e)}"        

@app.route('/carousal', methods=['POST'])
def greet():
        mnth= request.json['Date']
        K=4
        date_generated = pd.date_range(mnth,freq="MS", periods=K)
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
        for k in carousal:
          sqlQuery='''with ab as ( select count(id) as Expired
                    from subsription_payment
                    where DATE_FORMAT(Subscription_End,'%Y-%m')=%s, bc as(
                    select count(id) as Re_new
                    from subsription_payment
                    where DATE_FORMAT(Subscription_Start,'%Y-%m')=%s)
                    select Expired, Re_new from ab,bc;'''
        cursor = mydb.cursor(dictionary=True)           
        cursor.execute(sqlQuery,[k])            
        value=cursor.fetchall()  
                    
        return jsonify(value)  
        
# for getting selected  month customer details 
@app.route('/subscription', methods=['POST'])

def payment():
    try:   
        mnth= request.json['startDate']    
        pattern_str = r'^\d{4}-\d{2}$'
        if re.match(pattern_str,mnth):      
             sqlQuery='''select customer_master.Date_Of_Registration,customer_master.Register_Email,
                    customer_master.Customer_Id,customer_master.Approved_Date,customer_master.Next_Renewal,
                    subsription_payment.Subscription_Start,subsription_payment.Subscription_End,subsription_payment.Payment_Type,
                    subsription_payment.Payment_Date 
                    from customer_master left join subsription_payment 
                    on customer_master.Customer_Id=subsription_payment.Customer_Id                   
                    where DATE_FORMAT(Subscription_Start,'%Y-%m') <=%s and DATE_FORMAT(Subscription_End,'%Y-%')>=%s'''     
             print("hi")      
             cursor = mydb.cursor(dictionary=True)
             print("hi2")                       
             cursor.execute(sqlQuery,[mnth,mnth])  
             value=cursor.fetchall()     
             cursor.close()  
             print(value)              
             return value     
        else :
            return "please enter only year and month in YYYY-MM format not like " +  mnth
        
    except ValueError:
         return "error while passing the value"
    
# To send the email remainder to the customer  
@app.route('/gmailremainder/<id>', methods =['GET'])

def email_alert(id):
      
        sqlQuery= '''select Register_Email,Next_Renewal
                     from customer_master 
                     where Customer_Id=%s'''
        cursor = mydb.cursor(dictionary=True)           
        cursor.execute(sqlQuery,[id])     
        print(id)      
        data=cursor.fetchall()  
        print(data)      
        for x in data:
            value=x
            print(value)     
        body=list(value.values()) 
        var_dict={'Email':body[0],'date':body[1]}
        Email,date=var_dict.values()  
        print([Email])
        print(date) 

        if body:
            msg = Message(
                        'payment remainder',
                        sender ='reddytharun152@gmail.com',
                        recipients = [Email]  
                        )       
            msg.body =f'''
                    Dear Customer,Greetings, Hope you are safe!
                    Gentle Reminder!   

                    Your eAWBLink subscription renewal is due.
                    Your account has expired on {date}.

                    please click on the link below  to renew and use the eawbLink application without any interruption.
                    Link for card payment :-EAWBLink 1 Year subscription plan.
                    For bank Transfers (or) any questions, please contact us subscriptions@eawblink.org


                    Thanks & Regards,
                    subscriptions'''                      
            mail.send(msg)
            return 'Remainder sent succesfully'

        else :
           return 'unable to send the  email remiander'
                   
#To show the invoice details of the customer from the invoice table
 
@app.route('/invoicedetails/<id>', methods=['GET'])

def invoice(id):
        sqlQuery= "select * from invoice_details where Customer_Id=%s"
        cursor = mydb.cursor(dictionary=True)           
        cursor.execute(sqlQuery,[id])     
        print(id)      
        value=cursor.fetchall()      
        print(value)
                       
        return jsonify(value)  

@app.route('/filtering', methods =['GET', 'POST'])
def filteredData():  
    date=request.json['Input_date']
    print(date)
    inputArray=request.json['Input_array']
    allRecordsQuery=" select customer_master.Date_Of_Registration,customer_master.Register_Email,customer_master.Customer_Id,customer_master.Approved_Date,customer_master.Next_Renewal,subsription_payment.Subscription_Start,subsription_payment.Subscription_End,subsription_payment.Payment_Type,subsription_payment.Payment_Date from customer_master left join subsription_payment on customer_master.Customer_Id=subsription_payment.Customer_Id where DATE_FORMAT(Subscription_Start,'%Y-%m')<=%s and DATE_FORMAT(Subscription_End,'%Y-%m')>=%s"
    additionQuery=" and DATE_FORMAT(Subscription_Start,'%Y-%m')=%s"
    expiryQuery=" and DATE_FORMAT(Subscription_End,'%Y-%m')= %s"
    activeQuery=" and DATE_FORMAT(Subscription_Start,'%Y-%m')<=%s and DATE_FORMAT(Subscription_End,'%Y-%m')>=%s"
       
    if inputArray['allRecords']=='1':   
        
        #print(mainQuery)
        cursor = mydb.cursor(dictionary=True)
        cursor.execute( allRecordsQuery,[date,date])
        rows=cursor.fetchall()
        print(rows)
        return jsonify(rows)
        
    elif inputArray['activeRecords']=='1':
        
       # print(mainQuery+allRecordsQuery)
        cursor=mydb.cursor(dictionary=True)          
        cursor.execute( allRecordsQuery+activeQuery,[date,date,date,date])
        rows=cursor.fetchall()
        print(rows)
        return jsonify(rows)      
    elif inputArray['additionData']=='1':
        #print(mainQuery+additionQuery)
        cursor=mydb.cursor(dictionary=True)  
        cursor.execute( allRecordsQuery+additionQuery,[date,date,date])
        rows=cursor.fetchall()
        print(rows)
        return jsonify(rows)
    elif inputArray['expiryData']=='1':
        
        #print(mainQuery+expiryQuery)
        cursor=mydb.cursor(dictionary=True)
        cursor.execute( allRecordsQuery+expiryQuery,[date,date,date])
        rows=cursor.fetchall()
        print(rows)
        return jsonify(rows)
        
    else:
        return jsonify(rows)     


def Get_Range_Of_Renewal223(myDateString):

   myDate = datetime.strptime(myDateString, "%Y-%m")




   subMonthNumber = 2;

   newDate = myDate - relativedelta(months=subMonthNumber)

   print(myDate)

   print(newDate )

   return  ( newDate)





@app.route('/Cards',methods=['GET','POST'])

def Get_Range_Of_Renewal1():

        _Act= request.json['MAHESH']

        if _Act and request.method == 'GET':

            result=[]
   
            _Act1=Get_Range_Of_Renewal223(_Act)

            cursor = mydb.cursor(dictionary=True)

            for i in range(1,13):  

                      

                cursor.execute("with ab as (select count(id) as Expired from subsription_payment where DATE_FORMAT(Subscription_End,'%Y-%m')=%s), bc as (select count(id) as Re_new from subsription_payment where DATE_FORMAT(Subscription_Start,'%Y-%m')=%s), ca as (select count(id) as active from subsription_payment where DATE_FORMAT(Subscription_Start,'%Y-%m') <=%s  and DATE_FORMAT(Subscription_End,'%Y-%m')>=%s) select Expired,  Re_new, active from ab,bc,ca groupby Subscription_Start ",[_Act1,_Act1,_Act1,_Act1])

                value=cursor.fetchall()
      
                print(value)

                result.append(value)

               

                _Act1 = _Act1 + relativedelta(months=1)

               

                print(_Act1)

                print("hi")

            return jsonify(result)  

        return jsonify(_Act)  
      
@app.errorhandler(404)
def showMessage(error=None):
    message = { 
        'status': 404, 
        'message': 'Record not found: ' + request.url,
    }     
    respone = jsonify(message)
    respone.status_code = 404 
    return respone            
              

if __name__ == '__main__':
    app.run(debug=True)
