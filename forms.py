from datetime import date
import sys
from typing import Dict

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement


def main() -> None:
    args = sys.argv[1:]

    forms = {
        'adopt': adopt,
        'contact': contact,
        'foster': foster,
        'volunteer': volunteer,
    }

    if not all(arg in forms for arg in args):
        raise Exception(f'One of the args, {args}, is not a form!')

    data = {
        'site': 'https://gentle-capybara-d19ff1.netlify.app'
    }

    for arg in args:
        forms[arg](data=data)


def contact(data: Dict) -> None:
    driver = webdriver.Firefox()
    driver.get(data['site'] + '/index.html#main')

    driver.find_element(by=By.ID, value='contact-name').send_keys('Dathanial Autobot')
    driver.find_element(by=By.ID, value='contact-email').send_keys('lbfelinerescue@googlegroups.com')
    driver.find_element(by=By.ID, value='contact-message').send_keys('Testing selenium')

    submit = driver.find_element(by=By.XPATH, value='//input[@value="Send"]')
    submit.click()


def volunteer(data: Dict) -> None:
    driver = webdriver.Firefox()
    driver.get(data['site'] + '/volunteer-form/')

    notice_elem = driver.find_element(by=By.XPATH, value='//input[@name="volunteer-notice"]')
    js_click(driver, notice_elem)

    driver.find_element(by=By.ID, value='applicant-name').send_keys('Dathanial Autobot')
    driver.find_element(by=By.ID, value='applicant-occupation').send_keys('Cat Daddy')
    driver.find_element(by=By.ID, value='applicant-email').send_keys('lbfelinerescue@googlegroups.com')
    driver.find_element(by=By.ID, value='applicant-phone').send_keys('562-123-4567')

    best_time_to_call = driver.find_element(by=By.ID, value='best-time-to-call-afternoon')
    js_click(driver, best_time_to_call)

    driver.find_element(by=By.ID, value='applicant-address').send_keys('123 Kitty Lane')
    driver.find_element(by=By.ID, value='applicant-city').send_keys('Long Beach')
    driver.find_element(by=By.ID, value='applicant-state').send_keys('CA')
    driver.find_element(by=By.ID, value='applicant-zip-code').send_keys('90802')
    driver.find_element(by=By.ID, value='how-long-at-address').send_keys('9 years')

    js_click(driver, driver.find_element(by=By.ID, value='volunteer-interest-fundraising'))
    js_click(driver, driver.find_element(by=By.ID, value='volunteer-interest-data-entry'))
    js_click(driver, driver.find_element(by=By.ID, value='volunteer-interest-fostering'))
    driver.find_element(by=By.ID, value='volunteer-additional-interests').send_keys('automated testing')

    driver.find_element(by=By.ID, value='volunteer-hours-available').send_keys('2')
    driver.find_element(by=By.ID, value='volunteer-special-skills').send_keys('selenium')
    driver.find_element(by=By.ID, value='volunteer-limitations').send_keys('npm')

    date_input = driver.find_element(By.XPATH, '//input[@type="date"]')
    driver.execute_script(f"arguments[0].value = '{date.today()}'", date_input)

    action = ActionChains(driver)
    canvas = driver.find_element(by=By.CSS_SELECTOR, value="canvas")
    driver.execute_script("arguments[0].scrollIntoView();", canvas)
    drawing = (action
               .click_and_hold(canvas)
               .move_by_offset(-10, -10)
               .move_by_offset(15, 0)
               .move_by_offset(0, 15)
               .move_by_offset(-15, 0)
               .move_by_offset(0, -15)
               ).release()
    drawing.perform()

    submit = driver.find_element(by=By.XPATH, value='//input[@value="Send"]')
    submit.click()


def foster(data: Dict) -> None:
    driver = webdriver.Firefox()
    driver.get(data['site'] + '/foster-form/')

    notice_elem = driver.find_element(by=By.XPATH, value='//input[@name="foster-notice"]')
    js_click(driver, notice_elem)

    driver.find_element(by=By.ID, value='applicant-name').send_keys('Dathanial Autobot')
    driver.find_element(by=By.ID, value='applicant-occupation').send_keys('Cat Daddy')
    driver.find_element(by=By.ID, value='applicant-email').send_keys('lbfelinerescue@googlegroups.com')
    driver.find_element(by=By.ID, value='applicant-phone').send_keys('562-123-4567')

    js_click(driver, driver.find_element(by=By.ID, value='foster-interests-baby-bottle-kitten'))
    js_click(driver, driver.find_element(by=By.ID, value='foster-interests-teenagers'))
    js_click(driver, driver.find_element(by=By.ID, value='foster-interests-special-needs-timid'))

    driver.find_element(by=By.ID, value='previous-foster-experience').send_keys('absolutely nothing')

    driver.find_element(by=By.ID, value='applicant-address').send_keys('123 Kitty Lane')
    driver.find_element(by=By.ID, value='applicant-city').send_keys('Long Beach')
    driver.find_element(by=By.ID, value='applicant-state').send_keys('CA')
    driver.find_element(by=By.ID, value='applicant-zip-code').send_keys('90802')
    driver.find_element(by=By.ID, value='how-long-at-address').send_keys('9 years')

    driver.find_element(by=By.ID, value='other-residents-adults').send_keys('n/a')
    driver.find_element(by=By.ID, value='other-residents-children').send_keys('n/a')

    js_click(driver, driver.find_element(by=By.ID, value='pet-permission-yes'))

    driver.find_element(by=By.ID, value='current-pets-cats').send_keys('2')
    driver.find_element(by=By.ID, value='current-pets-dogs').send_keys('0')
    driver.find_element(by=By.ID, value='current-pets-other').send_keys('1')

    js_click(driver, driver.find_element(by=By.ID, value='current-pet-vaccinations-yes'))
    js_click(driver, driver.find_element(by=By.ID, value='indoor-only'))

    js_click(driver, driver.find_element(by=By.ID, value='provide-food-and-supplies-yes'))
    js_click(driver, driver.find_element(by=By.ID, value='discussed-with-household-yes'))
    js_click(driver, driver.find_element(by=By.ID, value='transportation-available-yes'))
    js_click(driver, driver.find_element(by=By.ID, value='significant-changes-no'))
    js_click(driver, driver.find_element(by=By.ID, value='room-for-foster-isolation-not-applicable'))

    driver.find_element(by=By.ID, value='foster-limitations').send_keys('dairy')

    date_input = driver.find_element(By.XPATH, '//input[@type="date"]')
    driver.execute_script(f"arguments[0].value = '{date.today()}'", date_input)

    action = ActionChains(driver)
    canvas = driver.find_element(by=By.CSS_SELECTOR, value="canvas")
    driver.execute_script("arguments[0].scrollIntoView();", canvas)
    drawing = (action
               .click_and_hold(canvas)
               .move_by_offset(-10, -10)
               .move_by_offset(15, 0)
               .move_by_offset(0, 15)
               .move_by_offset(-15, 0)
               .move_by_offset(0, -15)
               ).release()
    drawing.perform()

    submit = driver.find_element(by=By.XPATH, value='//input[@value="Send"]')
    submit.click()


def adopt(data: Dict) -> None:
    print('adopt')


def js_click(driver: WebDriver, elem: WebElement):
    '''Used to click buttons and checkboxes.
    https://stackoverflow.com/a/67696616/13358239
    '''
    driver.execute_script("arguments[0].click();", elem)


if __name__ == '__main__':
    main()

