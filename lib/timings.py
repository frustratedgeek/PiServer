
## ----- IMPORTS -----

from datetime import datetime, timedelta
import time



## ----- FUNCTIONS -----

def now(x):
    second = time.strftime('%S')
    minute = time.strftime('%M')
    hour = time.strftime('%H')
    day = time.strftime('%A')
    date = (time.strftime('%d')).lstrip('0')
    month = time.strftime('%B')
    year = time.strftime('%Y')
    if x == 'second':
        return second
    elif x == 'minute':
        return minute
    elif x == 'hour':
        return hour
    elif x == 'day':
        return day
    elif x == 'date':
        return date
    elif x == 'month':
        return month
    elif x == 'year':
        return year
    else:
        date = (time.strftime('%d')).lstrip('0')
        if date == '1' or date == '21' or date == '31':
            return 'st'
        elif date == '2' or date == '22':
            return 'nd'
        elif date == '3' or date == '23':
            return 'rd'
        else:
            return 'th'

def timeDate(x):
    second = time.strftime('%S')
    minute = time.strftime('%M')
    hour = time.strftime('%H')
    day = time.strftime('%A')
    date = (time.strftime('%d')).lstrip('0')
    month = time.strftime('%B')
    year = time.strftime('%Y')
    today = (time.strftime('%d')).lstrip('0')
    if today == '1' or today == '21' or today == '31':
        suffix = 'st'
    elif today == '2' or today == '22':
        suffix = 'nd'
    elif date == '3' or date == '23':
        suffix = 'rd'
    else:
        suffix = 'th'
    if x == 'time':
        return str(hour + ':' + minute + ':' + second)
    elif x == 'date':
        return str(day + ' ' + date + suffix + ' ' + month + ' ' + year)
    else:
        return ''

def timePassed(point):
    difference = datetime.now() - point
    seconds = difference.total_seconds()
    if seconds < 0:
        seconds = 0 - seconds
    minutes = seconds / 60
    hours = minutes / 60
    days = hours / 24
    weeks = days / 7
    months = days / 30
    years = days / 365
    if minutes < 1:
        seconds = int(round(seconds))
        if seconds <= 1:
            return (seconds, 'second')
        else:
            return (seconds, 'seconds')
    elif hours < 1:
        minutes = int(round(minutes))
        if minutes == 1:
            return (minutes, 'minute')
        else:
            return (minutes, 'minutes')
    elif days < 1:
        hours = int(round(hours))
        if hours == 1:
            return (hours, 'hour')
        else:
            return (hours, 'hours')
    elif weeks < 1:
        days = int(round(days))
        if days == 1:
            return (days, 'day')
        else:
            return (days, 'days')
    elif months < 1:
        weeks = int(round(weeks))
        if weeks == 1:
            return (weeks, 'week')
        else:
            return (weeks, 'weeks')
    elif years < 1:
        months = int(round(months))
        if months == 1:
            return (months, 'month')
        else:
            return (months, 'months')
    else:
        years = int(round(years))
        if years == 1:
            return (years, 'year')
        else:
            return (years, 'years')

def dayPart(h):
    ##hour = datetime.now().hour
    hour = int(h)
    if 4 <= hour <= 11:
        return 'morning'
    elif 12 <= hour <= 17:
        return 'afternoon'
    elif 18 <= hour <= 22:
        return 'evening'
    else:
        return 'night'



## ----- EASTER EGG -----

print timeDate('date')
print timeDate('time')
