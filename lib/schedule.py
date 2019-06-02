
## ----- IMPORTS -----

from datetime import datetime, timedelta
from threading import Thread
import ast
import time

import threads



## ----- GLOBAL VARIABLES -----

scheduleChangeTime = 0
scheduleChange = 0
scheduleConflict = False



## ----- MEMORY VARIABLES -----

pausedStatus = 'runnning'
dictionaryTimes = {'mondayMorning': '', 'mondayEvening': '', 'mondayWeekend': '',
                   'tuesdayMorning': '', 'tuesdayEvening': '', 'tuesdayWeekend': '',
                   'wednesdayMorning': '', 'wednesdayEvening': '', 'wednesdayWeekend': '',
                   'thursdayMorning': '', 'thursdayEvening': '', 'thursdayWeekend': '',
                   'fridayMorning': '', 'fridayEvening': '', 'fridayWeekend': '',
                   'saturdayMorning': '', 'saturdayEvening': '', 'saturdayWeekend': '',
                   'sundayMorning': '', 'sundayEvening': '', 'sundayWeekend': ''}
dictionaryExtra = {'morningLightLevel': '', 'eveningLightLevel': '', 'weekendLightLevel': ''}
dictionaryCheckboxes = {'hallLightOnCheckMorning': '', 'hallLightOffCheckMorning': '',
                        'kitchenMainLightOnCheckMorning': '', 'kitchenMainLightOffCheckMorning': '',
                        'kitchenAmbientLightOnCheckMorning': '', 'kitchenAmbientLightOffCheckMorning': '',
                        'loungeLightOnCheckMorning': '', 'loungeLightOffCheckMorning': '',
                        'bedroom1MainLightOnCheckMorning': '', 'bedroom1MainLightOffCheckMorning': '',
                        'bedroom1AmbientLightOnCheckMorning': '', 'bedroom1AmbientLightOffCheckMorning': '',
                        'hallLightOnCheckMorning': '', 'hallLightOffCheckMorning': '',
                        'bedroom2LightOnCheckMorning': '', 'bedroom2LightOffCheckMorning': '',
                        'bathroomLightOnCheckMorning': '', 'bathroomLightOffCheckMorning': '',
                        'hallHeaterOnCheckMorning': '', 'hallHeaterOffCheckMorning': '',
                        'lounge1HeaterOnCheckMorning': '', 'lounge1HeaterOffCheckMorning': '',
                        'lounge2HeaterOnCheckMorning': '', 'lounge2HeaterOffCheckMorning': '',
                        'hallLightOnCheckEvening': '', 'hallLightOffCheckEvening': '',
                        'kitchenMainLightOnCheckEvening': '', 'kitchenMainLightOffCheckEvening': '',
                        'kitchenAmbientLightOnCheckEvening': '', 'kitchenAmbientLightOffCheckEvening': '',
                        'loungeLightOnCheckEvening': '', 'loungeLightOffCheckEvening': '',
                        'bedroom1MainLightOnCheckEvening': '', 'bedroom1MainLightOffCheckEvening': '',
                        'bedroom1AmbientLightOnCheckEvening': '', 'bedroom1AmbientLightOffCheckEvening': '',
                        'hallLightOnCheckEvening': '', 'hallLightOffCheckEvening': '',
                        'bedroom2LightOnCheckEvening': '', 'bedroom2LightOffCheckEvening': '',
                        'bathroomLightOnCheckEvening': '', 'bathroomLightOffCheckEvening': '',
                        'hallHeaterOnCheckEvening': '', 'hallHeaterOffCheckEvening': '',
                        'lounge1HeaterOnCheckEvening': '', 'lounge1HeaterOffCheckEvening': '',
                        'lounge2HeaterOnCheckEvening': '', 'lounge2HeaterOffCheckEvening': '',
                        'hallLightOnCheckWeekend': '', 'hallLightOffCheckWeekend': '',
                        'kitchenMainLightOnCheckWeekend': '', 'kitchenMainLightOffCheckWeekend': '',
                        'kitchenAmbientLightOnCheckWeekend': '', 'kitchenAmbientLightOffCheckWeekend': '',
                        'loungeLightOnCheckWeekend': '', 'loungeLightOffCheckWeekend': '',
                        'bedroom1MainLightOnCheckWeekend': '', 'bedroom1MainLightOffCheckWeekend': '',
                        'bedroom1AmbientLightOnCheckWeekend': '', 'bedroom1AmbientLightOffCheckWeekend': '',
                        'hallLightOnCheckWeekend': '', 'hallLightOffCheckWeekend': '',
                        'bedroom2LightOnCheckWeekend': '', 'bedroom2LightOffCheckWeekend': '',
                        'bathroomLightOnCheckWeekend': '', 'bathroomLightOffCheckWeekend': '',
                        'hallHeaterOnCheckWeekend': '', 'hallHeaterOffCheckWeekend': '',
                        'lounge1HeaterOnCheckWeekend': '', 'lounge1HeaterOffCheckWeekend': '',
                        'lounge2HeaterOnCheckWeekend': '', 'lounge2HeaterOffCheckWeekend': '',
                        'pcOnCheckMorning': '', 'pcOffCheckMorning': '',
                        'pcOnCheckEvening': '', 'pcOffCheckEvening': '',
                        'pcOnCheckWeekend': '', 'pcOffCheckWeekend': ''}



## ----- STATUS -----

def dataLoad():
    global dictionaryTimes, dictionaryExtra, dictionaryCheckboxes
    f = open('/home/pi/webserver/data/scheduleTimes.txt')
    times = f.read()
    f.close()
    f = open('/home/pi/webserver/data/scheduleExtra.txt')
    extra = f.read()
    f.close()
    f = open('/home/pi/webserver/data/scheduleCheckboxes.txt')
    checkboxes = f.read()
    f.close()
    try:
        dictionaryTimes = ast.literal_eval(times)
        dictionaryExtra = ast.literal_eval(extra)
        dictionaryCheckboxes = ast.literal_eval(checkboxes)
    except:
        pass
dataLoad()

def time(x):
    try:
        combined = dict(dictionaryTimes.items() + dictionaryExtra.items() + dictionaryCheckboxes.items())
        return str(combined[x])
    except:
        return ''

def getDictionary(x):
    if x == 'times':
        return dictionaryTimes
    elif x == 'extra':
        return dictionaryExtra
    elif x == 'checkbox':
        return dictionaryCheckboxes
    else:
        return ''

def pauseStatusLoad():
    global pausedStatus
    f = open('/home/pi/webserver/data/schedulePause.txt')
    status = f.read()
    f.close()
    pausedStatus = status
pauseStatusLoad()

def pauseStatus():
    return pausedStatus

def scheduleMessage():
    global pausedStatus, scheduleChangeTime, scheduleChange, scheduleConflict
    if scheduleChangeTime == 0:
        if pausedStatus == 'running':
            status = 'running'
        else:
            status = 'paused'
    else:
        if datetime.now() <= scheduleChangeTime + timedelta(seconds=5):
            status = scheduleChange
        else:
            if pausedStatus == 'running':
                status = 'running'
            else:
                status = 'paused'
    if scheduleConflict == True:
        status = 'conflict'
    if status == 'paused':
        return 'The schedule has been paused'
    elif status == 'resumed':
        return 'The schedule has been resumed'
    elif status == 'updated':
        return 'The schedule has been updated'
    elif status == 'conflict':
        return 'Scheduling conflict detected'
    else:
        return ''

def cleanSlate():
    return None



## ----- EDIT SCHEDULE -----

def setSchedule(timesIN, extraIN, checkboxDataIN):
    global dictionaryTimes, dictionaryExtra, dictionaryCheckboxes, scheduleChangeTime, scheduleChange, scheduleConflict
    inputTimes = timesIN
    inputExtra = extraIN
    inputCheckboxes = checkboxDataIN
    for key in inputTimes:
        try:
            if len(inputTimes[key]) == 4:
                if (inputTimes[key])[1] == ':' or (inputTimes[key])[1] == '.' or (inputTimes[key])[1] == ' ':
                    if 0 <= int((inputTimes[key])[:1]) <= 9 and 0 <= int((inputTimes[key])[-2:]) <= 59:
                        dictionaryTimes[key] = inputTimes[key]
            elif len(inputTimes[key]) == 5:
                if (inputTimes[key])[2] == ':' or (inputTimes[key])[2] == '.' or (inputTimes[key])[2] == ' ':
                    if 10 <= int((inputTimes[key])[:2]) <= 23 and 0 <= int((inputTimes[key])[-2:]) <= 59:
                        dictionaryTimes[key] = inputTimes[key]
            elif len(inputTimes[key]) == 0:
                dictionaryTimes[key] = ''
            else:
                pass
        except:
            pass
    for key in inputExtra:
        try:
            if key == 'morningLightLevel':
                if inputExtra[key] == '' or 0 <= int(inputExtra[key]) <= 100:
                    dictionaryExtra[key] = inputExtra[key]
            elif key == 'eveningLightLevel':
                if inputExtra[key] == '' or 0 <= int(inputExtra[key]) <= 100:
                    dictionaryExtra[key] = inputExtra[key]
            elif key == 'weekendLightLevel':
                if inputExtra[key] == '' or 0 <= int(inputExtra[key]) <= 100:
                    dictionaryExtra[key] = inputExtra[key]
            else:
                pass
        except:
            pass
    for key in dictionaryCheckboxes:
        try:
            dictionaryCheckboxes[key] = inputCheckboxes[key]
        except:
            pass
    scheduleAlert = False
    for key in dictionaryCheckboxes:
        if 'On' in key:
            keyDevice = key.split('On')[0]
            if 'Morning' in key:
                keyDevice = (keyDevice, 'Morning')
            if 'Evening' in key:
                keyDevice = (keyDevice, 'Evening')
            if 'Weekend' in key:
                keyDevice = (keyDevice, 'Weekend')
            device = []
            for otherKey in dictionaryCheckboxes:
                if keyDevice[0] in otherKey and keyDevice[1] in otherKey:
                    device.append(otherKey)
            if dictionaryCheckboxes[device[0]] == 'True' and dictionaryCheckboxes[device[1]] == 'True':
                scheduleAlert = True
    if scheduleAlert == False:
        scheduleConflict = False
    else:
        scheduleConflict = True
    f = open('/home/pi/webserver/data/scheduleTimes.txt', 'w')
    f.write(str(dictionaryTimes))
    f.close()
    f = open('/home/pi/webserver/data/scheduleExtra.txt', 'w')
    f.write(str(dictionaryExtra))
    f.close()
    f = open('/home/pi/webserver/data/scheduleCheckboxes.txt', 'w')
    f.write(str(dictionaryCheckboxes))
    f.close()
    threads.restartPrompt('schedule')
    scheduleChange = 'updated'
    scheduleChangeTime = datetime.now()
    return

def pauseSchedule():
    global pausedStatus, scheduleChangeTime, scheduleChange
    if pauseStatus() == 'running':
        status = 'paused'
        scheduleChange = 'paused'
    else:
        status = 'running'
        scheduleChange = 'resumed'
    f = open('/home/pi/webserver/data/schedulePause.txt', 'w')
    f.write(status)
    f.close()
    threads.restartPrompt('schedule')
    pausedStatus = status
    scheduleChangeTime = datetime.now()
    return None
