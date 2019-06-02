## ----- IMPORTS -----

from flask import Flask, render_template, request, jsonify, make_response, Response
from datetime import datetime, timedelta
from threading import Thread
import random
import time
import os
import sys
import math
import ast
from urllib2 import urlopen
import RPi.GPIO as GPIO

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(38, GPIO.OUT)
GPIO.output(38, GPIO.LOW)
GPIO.setup(40, GPIO.OUT)
GPIO.output(40, GPIO.LOW)

try:
    from lib import IOPiPlus1
    th = Thread(target=IOPiPlus1.readLoop)
    th.setDaemon(True)
    th.start()
except:
    pass

from lib import lighting
from lib import heating
from lib import userControl
from lib import network
from lib import timings
from lib import flags
from lib import schedule
from lib import threads
from lib import power
from lib import appliances



## ----- GLOBAL VARIABLES -----

app = Flask(__name__)
localIpStart = '192.168.1.'



## ----- THREADS -----

th = Thread(target=threads.getMeasuredRoomValues)
th.setDaemon(True)
th.start()

th = Thread(target=threads.getNetworkSpeeds)
th.setDaemon(True)
th.start()

th = Thread(target=threads.pingPC)
th.setDaemon(True)
th.start()

th = Thread(target=threads.runSchedule)
th.setDaemon(True)
th.start()

th = Thread(target=heating.heatingDetectLoop)
th.setDaemon(True)
th.start()



@app.route('/divs/<string:destination>')
def contents(destination):
    return render_template(str(destination) + '.html',)



## ----- JSON PAGE DATA -----

@app.route('/pageData/<string:hour>', methods=['GET'])
def pageData(hour):
    ## TOP DISPLAY
    topMessage = userControl.welcomeMessage(str(hour))
    ## MASTER
    customColour = userControl.customStyle('colour')
    customOpacity = userControl.customStyle('opacity')
    ## PI CONTROL
    cpuUsage = power.readStatus('currentCpuUsag')
    cpuFrequency = power.readStatus('currentCpuFreq')
    cpuTemp = power.readStatus('currentCpuTemp')
    ping = threads.networkSpeedStatus(0)
    download = threads.networkSpeedStatus(1)
    upload = threads.networkSpeedStatus(2)
    userAddress = power.readStatus('userIpAddress')
    publicAddress = power.readStatus('publicIpAddres')
    routerAddress = power.readStatus('routerIpAddres')
    serverAddress = power.readStatus('localIpAddress')
    primaryRelaySatus = str(power.powerRelayStatus('primary'))
    auxRelaySatus = str(power.powerRelayStatus('aux'))
    ## SETTINGS
    settingsMessage = userControl.settingsStat()
    passwordMessage = userControl.passwordStat()
    ## SCHEDULE
    scheduleStatus = schedule.pauseStatus()
    scheduleMessage = schedule.scheduleMessage()
    ## LIGHTING
    hallLight = lighting.status('hall')
    kitchenMainLight = lighting.status('kitchenMain')
    kitchenSecondLight = lighting.status('kitchenAmbient')
    spareLight = lighting.status('bedroom2')
    masterMainLight = lighting.status('bedroom1Main')
    masterSecondLight = lighting.status('bedroom1Ambient')
    loungeLight = lighting.status('lounge')
    bathroomLight = lighting.status('bathroom')
    ## HEATING
    hallHeater = heating.status('hall')
    kitchenHeater = heating.status('kitchen')
    spareHeater = heating.status('bedroom2')
    masterHeater = heating.status('bedroom1')
    loungeHeater = heating.status('lounge')
    bathroomHeater = heating.status('bathroom')
    other1Heater = heating.status('other1')
    other2Heater = heating.status('other2')
    heaterStart = heating.getHeaterTime('start')
    heaterEnd = heating.getHeaterTime('end')
    ## APPLIANCES
    pcStatus = appliances.pcStatus()
    ## MEASURED ROOM VALUES
    kitchenLightReading = int(round(threads.measuredValue('kitchen', 'light'),0))
    kitchenTemperatureReading = int(round(threads.measuredValue('kitchen', 'temperature'),0))
    kitchenHumidityReading = int(round(threads.measuredValue('kitchen', 'humidity'),0))
    bathroomLightReading = int(round(threads.measuredValue('bathroom', 'light'),0))
    bathroomTemperatureReading = int(round(threads.measuredValue('bathroom', 'temperature'),0))
    bathroomHumidityReading = int(round(threads.measuredValue('bathroom', 'humidity'),0))
    hallLightReading = int(round(threads.measuredValue('hall', 'light'),0))
    hallTemperatureReading = int(round(threads.measuredValue('hall', 'temperature'),0))
    hallHumidityReading = int(round(threads.measuredValue('hall', 'humidity'),0))
    loungeLightReading = int(round(threads.measuredValue('lounge', 'light'),0))
    loungeTemperatureReading = int(round(threads.measuredValue('lounge', 'temperature'),0))
    loungeHumidityReading = int(round(threads.measuredValue('lounge', 'humidity'),0))
    bedroom1LightReading = int(round(threads.measuredValue('bedroom1', 'light'),0))
    bedroom1TemperatureReading = int(round(threads.measuredValue('bedroom1', 'temperature'),0))
    bedroom1HumidityReading = int(round(threads.measuredValue('bedroom1', 'humidity'),0))
    bedroom2LightReading = int(round(threads.measuredValue('bedroom2', 'light'),0))
    bedroom2TemperatureReading = int(round(threads.measuredValue('bedroom2', 'temperature'),0))
    bedroom2HumidityReading = int(round(threads.measuredValue('bedroom2', 'humidity'),0))
    averageLightReading = int(round(threads.measuredValue('average', 'light'),0))
    averageTemperatureReading = int(round(threads.measuredValue('average', 'temperature'),0))
    averageHumidityReading = int(round(threads.measuredValue('average', 'humidity'),0))
    ## RETURN
    return jsonify(topMessage=[topMessage],
                   customColour=[customColour], customOpacity=[customOpacity],
                   cpuUsage=[cpuUsage], cpuFrequency=[cpuFrequency], cpuTemp=[cpuTemp], ping=[ping], download=[download], upload=[upload], userAddress=[userAddress], publicAddress=[publicAddress],
                       routerAddress=[routerAddress], serverAddress=[serverAddress], primaryRelaySatus=[primaryRelaySatus], auxRelaySatus=[auxRelaySatus],
                   settingsMessage=[settingsMessage], passwordMessage=[passwordMessage],
                   scheduleStatus=[scheduleStatus], scheduleMessage=[scheduleMessage],
                   hallLight=[hallLight], kitchenMainLight=[kitchenMainLight], kitchenSecondLight=[kitchenSecondLight], spareLight=[spareLight], masterMainLight=[masterMainLight],
                       masterSecondLight=[masterSecondLight], loungeLight=[loungeLight], bathroomLight=[bathroomLight],
                   hallHeater=[hallHeater], kitchenHeater=[kitchenHeater], spareHeater=[spareHeater], masterHeater=[masterHeater], loungeHeater=[loungeHeater], bathroomHeater=[bathroomHeater],
                       other1Heater=[other1Heater], other2Heater=[other2Heater], heaterStart=[heaterStart], heaterEnd=[heaterEnd],
                   pcStatus=[pcStatus],
                   kitchenLightReading=kitchenLightReading, kitchenTemperatureReading=kitchenTemperatureReading, kitchenHumidityReading=kitchenHumidityReading,
                       bathroomLightReading=bathroomLightReading, bathroomTemperatureReading=bathroomTemperatureReading, bathroomHumidityReading=bathroomHumidityReading,
                       hallLightReading=hallLightReading, hallTemperatureReading=hallTemperatureReading, hallHumidityReading=hallHumidityReading,
                       loungeLightReading=loungeLightReading, loungeTemperatureReading=loungeTemperatureReading, loungeHumidityReading=loungeHumidityReading,
                       bedroom1LightReading=bedroom1LightReading, bedroom1TemperatureReading=bedroom1TemperatureReading, bedroom1HumidityReading=bedroom1HumidityReading,
                       bedroom2LightReading=bedroom2LightReading, bedroom2TemperatureReading=bedroom2TemperatureReading, bedroom2HumidityReading=bedroom2HumidityReading,
                       averageLightReading=averageLightReading, averageTemperatureReading=averageTemperatureReading, averageHumidityReading=averageHumidityReading)



## ----- SETTINGS PAGE -----

def customSettings(x):
    if x == 'opacity':
        return (float(userControl.customStyle(x)))*100
    else:
        return userControl.customStyle(x)

@app.route('/saveSettings', methods=['POST'])
def saveSettings():
    backgroundColour = str(request.form['backgroundColour'])
    backgroundOpacity = str(round(float(str(request.form['backgroundOpacity']))/100, 2))
    if network.validSession() == True:
        userControl.setStyle(backgroundColour, backgroundOpacity)
    return jsonify()

@app.route('/changePassword', methods=['POST'])
def changePassword():
    ## REMOVED
    



## ----- USER LOGIN CONTROL -----

@app.route('/')
def default():
    ## REMOVED
    if ## REMOVED:
        return render_template('master.html',)
    elif ## REMOVED:
        return ## REMOVED
    else:
        return render_template('login.html',)

@app.route('/login', methods=['POST'])
def login():
    ## REMOVED
    if valid == True:
        if user == 'shutdown':
            flags.shutDown()
            return render_template('login.html',)
        else:
            ## REMOVED
            ## local host
            if network.userAddress() == ## REMOVED:
                return ## REMOVED
            ## local network
            elif (network.userAddress()).startswith(localIpStart):
                return ## REMOVED
            ## local via internet
            elif network.userAddress() == network.currentPublicIP():
                return ## REMOVED
            ## internet
            else:
                return ## REMOVED
    else:
        userControl.latestUser('write', user, 5)
        return ## REMOVED
    
@app.route('/navigate', methods=['POST'])
def navigate():
    current = request.form.get('here')
    location = request.form.get('location')
    if network.validSession() == True:
        pass
    else:
        return render_template('login.html',)

@app.route('/logout', methods=['POST'])
def logout():
    return network.logout()

def powerStatus():
    return flags.powerStat()



## ----- PI CONTROL -----

@app.route('/powerRelay', methods=['POST'])
def powerRelay():
    if network.validSession() == True:
        circuit = str(request.form['circuit'])
        confirm = str(request.form['confirm'])
        power.powerRelays(circuit, confirm)
    return jsonify()

@app.route('/piPower', methods=['POST'])
def piPower():
    if network.validSession() == True:
        action = str(request.form.get('action'))
        confirmR = str(request.form.get('confirmRestart'))
        confirmSD = str(request.form.get('confirmShutDown'))
        if power.switch(action, confirmR, confirmSD) == True:
            return render_template('login.html',)
        else:
            return render_template('piControl.html',)
    else:
        return render_template('login.html',)



## ----- LIGHTING -----

@app.route('/lightSwitch/<string:light>', methods=['POST'])
def lightSwitch(light):
    if network.validSession() == True:
        lighting.switch(str(light))
    return jsonify()

        

## ----- HEATING -----

@app.route('/heaterSwitch/<string:heater>', methods=['POST'])
def heaterSwitch(heater):
    if network.validSession() == True:
        heating.switch(str(heater))
    return jsonify()



## ----- APPLIANCES -----

@app.route('/applianceSwitch', methods=['POST'])
def applianceSwitch():
    if network.validSession() == True:
        appliance = str(request.form['appliance'])
        confirm = str(request.form['confirm'])
        appliances.switch(appliance, confirm)
    return jsonify()



## ----- SCHEDULE -----

def scheduleTime(x):
    return schedule.time(x)

@app.route('/pauseSchedule', methods=['POST'])
def pauseSchedule():
    if network.validSession() == True:
        schedule.pauseSchedule()
    return jsonify()

@app.route('/saveSchedule', methods=['POST'])
def saveSchedule():
    times = {'mondayMorning': '', 'mondayEvening': '', 'mondayWeekend': '',
             'tuesdayMorning': '', 'tuesdayEvening': '', 'tuesdayWeekend': '',
             'wednesdayMorning': '', 'wednesdayEvening': '', 'wednesdayWeekend': '',
             'thursdayMorning': '', 'thursdayEvening': '', 'thursdayWeekend': '',
             'fridayMorning': '', 'fridayEvening': '', 'fridayWeekend': '',
             'saturdayMorning': '', 'saturdayEvening': '', 'saturdayWeekend': '',
             'sundayMorning': '', 'sundayEvening': '', 'sundayWeekend': ''}
    extra = {'morningLightLevel': '', 'eveningLightLevel': '', 'weekendLightLevel': ''}
    for key in times:
        times[key] = str(request.form[key])
    for key in extra:
        extra[key] = str(request.form[key])
    checkboxData = ast.literal_eval(str(request.form['checkboxSelection']))
    if network.validSession() == True:
        schedule.setSchedule(times, extra, checkboxData)
    return jsonify()



## ----- FUNCTIONS LIBRARY -----

app.jinja_env.globals.update(
    powerStatus=powerStatus,
    user=userControl.user,
    scheduleTime=scheduleTime,
    customSettings=customSettings,
    )



## ----- END -----

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=False, threaded=True, use_reloader=False)
