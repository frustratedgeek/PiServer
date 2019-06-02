
## ----- IMPORTS -----

from datetime import datetime, timedelta
from threading import Thread
import copy
import os
import RPi.GPIO as GPIO

import threads
import network



## ----- GLOBAL VARIABLES -----

powerChangeTime = 0
powerChange = 0
piCommands = {'minimumCpuFreq':  "cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_min_freq",
              'maximumCpuFreq':  "cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq",
              'currentCpuFreq':  "cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq",
              'currentCpuTemp':  "/opt/vc/bin/vcgencmd measure_temp",
              'currentCpuVolt':  "/opt/vc/bin/vcgencmd measure_volts core",
              'currentCpuUsag': "top -bn 2 -d 0.01 | grep '^%Cpu' | tail -n 1 | awk '{print $2+$4+$6}'",
              'routerIpAddres': "/sbin/ip route | awk '/default/ {print $3}'",
              'totalMemory': "cat /proc/meminfo| grep 'MemTotal:' | cut -d: -f2 | awk '{print $1}'",
              'freeMemory': "cat /proc/meminfo| grep 'MemFree:' | cut -d: -f2 | awk '{print $1}'"}

#'localIpAddress':  "/sbin/ifconfig eth0| grep 'inet' | cut -d: -f2 | awk '{print $1}'",

primaryRelayStatus = False
auxRelayStatus = False

## ----- POWER SWITCHES -----

def powerStat():
    global powerChangeTime, powerChange
    if powerChangeTime == 0:
        status = 'on'
    else:
        if powerChangeTime >= datetime.now() - timedelta(seconds=60):
            status = powerChange
        else:
            status = 'on'
    return status

def switch(x, y, z):
    if x == 'restart':
        if y == 'True':
            restart()
            return True
    else:
        if z == 'True':
            shutDown()
            return True
    return False

def restart():
    global powerChangeTime, powerChange
    powerChangeTime = datetime.now()
    powerChange = 'restart'
    th = Thread(target=threads.restart)
    th.setDaemon(True)
    th.start()
    return

def shutDown():
    global powerChangeTime, powerChange
    powerChangeTime = datetime.now()
    powerChange = 'shutDown'
    th = Thread(target=threads.shutDown)
    th.setDaemon(True)
    th.start()
    return

def powerRelays(circuit, confirm):
    global primaryRelayStatus, auxRelayStatus
    if confirm == 'True':
        if circuit == 'primary':
            if primaryRelayStatus == False:
                primaryRelayStatus = True
                GPIO.output(38, GPIO.HIGH)
            else:
                primaryRelayStatus = False
                GPIO.output(38, GPIO.LOW)
        elif circuit == 'aux':
            if auxRelayStatus == False:
                auxRelayStatus = True
                GPIO.output(40, GPIO.HIGH)
            else:
                auxRelayStatus = False
                GPIO.output(40, GPIO.LOW)
        else:
            pass  
    return

def powerRelayStatus(relay):
    if relay == 'primary':
        return primaryRelayStatus
    elif relay == 'aux':
        return auxRelayStatus
    else:
        return ''



## ----- PI STATUS -----

def readStatus(x):
    if x == 'userIpAddress':
        status = network.userAddress()
    elif x == 'publicIpAddres':
        status = network.currentPublicIP()
    elif x == 'localIpAddress':
        status = ## REMOVED
    else:
        command = os.popen(piCommands[x])
        status = command.read()
        command.close()
        if x == 'minimumCpuFreq':
            status = str(float(status[:-1])/1000000)
        if x == 'maximumCpuFreq':
            status = str(float(status[:-1])/1000000)
        if x == 'currentCpuFreq':
            status = str(float(status[:-1])/1000000)
        if x == 'currentCpuTemp':
            status = str(int(round(float(status[5:-3]),0)))
        if x == 'currentCpuVolt':
            status = str(round(float(status[5:-2]),3))      + ' volts'
        if x == 'currentCpuUsag':
            status = str(int(round(float(status[:-1]),0)))
        if x == 'localIpAddress':
            status = status[:-1]
        if x == 'routerIpAddres':
            status = status[:-1]
    return status
