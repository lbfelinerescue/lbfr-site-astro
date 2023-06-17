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
    driver = webdriver.Firefox()
    driver.get(data['site'] + '/adoption-form/')

    js_click(driver, driver.find_element(by=By.XPATH, value='//input[@name="notice-no-guarantee"]'))

    # about you
    driver.find_element(by=By.ID, value='applicant-name').send_keys('Dathanial Autobot')
    driver.find_element(by=By.ID, value='applicant-occupation').send_keys('Cat Daddy')
    driver.find_element(by=By.ID, value='applicant-email').send_keys('lbfelinerescue@googlegroups.com')
    driver.find_element(by=By.ID, value='applicant-phone').send_keys('562-123-4567')

    driver.find_element(by=By.ID, value='co-applicant-name').send_keys('Co-Dathanial Autobot')
    driver.find_element(by=By.ID, value='co-applicant-occupation').send_keys('Co-Cat Daddy')
    driver.find_element(by=By.ID, value='co-applicant-email').send_keys('lbfelinerescue@googlegroups.com')

    driver.find_element(by=By.ID, value='specific-cats').send_keys('no specific cats')

    js_click(driver, driver.find_element(by=By.ID, value='first-pet-yes'))
    js_click(driver, driver.find_element(by=By.ID, value='wlfc-for-you'))
    js_click(driver, driver.find_element(by=By.ID, value='wlfc-companion'))
    driver.find_element(by=By.ID, value='describe-gift-cat').send_keys('not a gift')
    js_click(driver, driver.find_element(by=By.ID, value='home-visit-object-no'))

    # residence info
    driver.find_element(by=By.ID, value='applicant-address').send_keys('123 Kitty Lane')
    driver.find_element(by=By.ID, value='applicant-city').send_keys('Long Beach')
    driver.find_element(by=By.ID, value='applicant-state').send_keys('CA')
    driver.find_element(by=By.ID, value='applicant-zip-code').send_keys('90802')
    driver.find_element(by=By.ID, value='how-long-at-address').send_keys('9 years')

    js_click(driver, driver.find_element(by=By.ID, value='housing-other'))
    driver.find_element(by=By.ID, value='describe-other-residence').send_keys('i live in netlify')
    js_click(driver, driver.find_element(by=By.ID, value='rent'))
    driver.find_element(by=By.ID, value='multi-unit-pet-rules').send_keys('there are no rules')
    driver.find_element(by=By.ID, value='landlord-name').send_keys('Sir Cattington')
    driver.find_element(by=By.ID, value='landlord-name').send_keys('Sir Cattington')
    driver.find_element(by=By.ID, value='landlord-phone').send_keys('562-987-6543')
    js_click(driver, driver.find_element(by=By.ID, value='pet-permission-yes'))

    # cat care
    driver.find_element(by=By.ID, value='who-responsible-cat').send_keys('I will be responsible.')
    driver.find_element(by=By.ID, value='where-litter-box').send_keys('In the living room.')
    driver.find_element(by=By.ID, value='cat-left-alone').send_keys('About 4 hours on the weekdays.')
    driver.find_element(by=By.ID, value='where-left-alone').send_keys('They can roam the house as they please.')

    driver.find_element(by=By.ID, value='cat-off-limits').send_keys('Just the garage.')
    js_click(driver, driver.find_element(by=By.ID, value='cat-sleep-anywhere'))
    driver.find_element(by=By.ID, value='catsleep-describe').send_keys('Anywhere but the garage.')
    js_click(driver, driver.find_element(by=By.ID, value='allowed-furniture-yes'))
    driver.find_element(by=By.ID, value='describe-furniture-allowed').send_keys('Furniture is fine.')

    js_click(driver, driver.find_element(by=By.ID, value='pet-door-no'))
    js_click(driver, driver.find_element(by=By.ID, value='pet-door-access-no'))
    js_click(driver, driver.find_element(by=By.ID, value='outdoor-balcony-patio'))
    driver.find_element(by=By.ID, value='inorout-describe').send_keys('They can go on the balcony supervised.')

    js_click(driver, driver.find_element(by=By.ID, value='declaw-no'))
    driver.find_element(by=By.ID, value='describe-declaw').send_keys('Never declaw!')
    js_click(driver, driver.find_element(by=By.ID, value='catclaw-post'))
    js_click(driver, driver.find_element(by=By.ID, value='catclaw-softpaws'))
    driver.find_element(by=By.ID, value='catclaw-describe').send_keys('Talk with a professional if needed.')

    # currently owned cats
    driver.find_element(by=By.XPATH, value='//input[@value="Add Cat"]').click()
    driver.find_element(by=By.XPATH, value='//input[@value="Add Cat"]').click()

    extra_cats_values = [
        {'name': 'Elton',
         'age': '1',
         'gender': 'male',
         'neutered': 'yes',
         'declawed-yesno': 'no',
         'declaw-where': 'never declaw!',
         'tested': 'yes',
         'result': 'negative',
         'outdoor-desc': 'No outdoors',
         'still-own': 'yes',
         },
        {'name': 'Easton',
         'age': '2',
         'gender': 'female',
         'neutered': 'yes',
         'declawed-yesno': 'no',
         'declaw-where': 'never declaw!',
         'tested': 'yes',
         'result': 'negative',
         'outdoor-desc': 'No outdoors',
         'still-own': 'yes',
         },
        ]
    extra_cats_elems = zip(
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-name")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-age")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-gender")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-spayed-neutered")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-declawed-yesno")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-declawed-where")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-felv-fiv-tested")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-felv-fiv-result")]'),
        driver.find_elements(by=By.XPATH, value='//textarea[starts-with(@id, "extra-cat-") and contains(@id, "-allowed-outdoors-other-description")]'),
        driver.find_elements(by=By.XPATH, value='//textarea[starts-with(@id, "extra-cat-") and contains(@id, "-dont-still-own")]'),
        )
    extra_cats_lod = [dict(zip(list(extra_cats_values[0].keys()), vals)) for vals in extra_cats_elems]

    for elems, vals in zip(extra_cats_lod, extra_cats_values):
        for key, elem in elems.items():
            elem.send_keys(vals[key])

    for elem in driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-cat-") and contains(@id, "-allowed-outdoors-no")]'):
        js_click(driver, elem)

    # currently owned dogs
    driver.find_element(by=By.XPATH, value='//input[@value="Add Dog"]').click()
    driver.find_element(by=By.XPATH, value='//input[@value="Add Dog"]').click()

    extra_dogs_values = [
        {'name': 'Babak',
         'age': '3',
         'gender': 'female',
         'neutered': 'no',
         'cat-exp': 'ooodles',
         'still-own': 'yes',
         },
        {'name': 'Mazdak',
         'age': '4',
         'gender': 'male',
         'neutered': 'yes',
         'cat-exp': 'tons',
         'still-own': 'maybe',
         },
        ]
    extra_dogs_elems = zip(
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-dog-") and contains(@id, "-name")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-dog-") and contains(@id, "-age")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-dog-") and contains(@id, "-gender")]'),
        driver.find_elements(by=By.XPATH, value='//input[starts-with(@id, "extra-dog-") and contains(@id, "-spayed-neutered")]'),
        driver.find_elements(by=By.XPATH, value='//textarea[starts-with(@id, "extra-dog-") and contains(@id, "-cat-exp")]'),
        driver.find_elements(by=By.XPATH, value='//textarea[starts-with(@id, "extra-dog-") and contains(@id, "-dont-still-own")]'),
        )
    extra_dogs_lod = [dict(zip(list(extra_dogs_values[0].keys()), vals)) for vals in extra_dogs_elems]

    for elems, vals in zip(extra_dogs_lod, extra_dogs_values):
        for key, elem in elems.items():
            elem.send_keys(vals[key])

    # lifestyle
    js_click(driver, driver.find_element(by=By.ID, value='have-vet-yes'))
    driver.find_element(by=By.ID, value='has-vet-name-addr').send_keys('Neko Sensei\n111 Nyaa Nyaa Ave.')

    js_click(driver, driver.find_element(by=By.ID, value='treatment-cost-other'))
    driver.find_element(by=By.ID, value='describe-treatment-cost').send_keys('Quality of life is the highest priority.')

    js_click(driver, driver.find_element(by=By.ID, value='circumstances-special-diet'))
    js_click(driver, driver.find_element(by=By.ID, value='circumstances-cat-become-disabled'))
    js_click(driver, driver.find_element(by=By.ID, value='circumstances-other'))
    driver.find_element(by=By.ID, value='circumstances-describe').send_keys('I just need an answer.')

    driver.find_element(by=By.ID, value='what-if-unable-to-care-for-cat').send_keys('I have friends and family that can take care of them or find them a new home.\nPerson 1\nPhone 1\nRelationship 1')
    driver.find_element(by=By.ID, value='what-if-go-out-of-town').send_keys('Find a cat sitter is my first choice. Board them if a sitter is not possible.')
    driver.find_element(by=By.ID, value='what-if-relocate-new-residence').send_keys('Not move there.')
    driver.find_element(by=By.ID, value='what-if-new-partner').send_keys('Find a new partner.')
    driver.find_element(by=By.ID, value='what-if-married-divorced').send_keys('Keep the cat.')
    driver.find_element(by=By.ID, value='reasonable-adjustment-time').send_keys('About a year.')

    # signature
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

    # submit
    submit = driver.find_element(by=By.XPATH, value='//input[@value="Send"]')
    submit.click()


def js_click(driver: WebDriver, elem: WebElement):
    '''Used to click buttons and checkboxes.
    https://stackoverflow.com/a/67696616/13358239
    '''
    driver.execute_script("arguments[0].click();", elem)


if __name__ == '__main__':
    main()

