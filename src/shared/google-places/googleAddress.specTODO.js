(function() {
  'use strict'
  
  describe('AddressComponents.validateAddressComponents()', function() {
    var service

    beforeEach(angular.mock.module('googleAddress'))

    beforeEach(inject(function(_AddressComponents_) {
      service = _AddressComponents_
    }))

    it('test service method exists', function() {
      expect(service.validateAddressComponents).not.toEqual(undefined)
    })

    it('test valid address components', function() {
        var example = {
            address1: '88 Homebug St.',
            zip: 90210,
            country_code: 'USA',
            city: 'Beverly Hills',
            state: 'CA',
            longitude: 14.32132,
            latitude: -140.13231,
        }
        var expectedResult = {
            isValid: true, 
            listInvalidComponents: []
        }
        var actualResult = service.validateAddressComponents(example)

        expect(expectedResult).toEqual(actualResult)
    })

    it('test invalid address components', function() {
        var example = {
            address1: '88 Homebug St.',
            zip: 90210,
            country_code: 'USA',
            state: 'CA',
            latitude: -140.13231,
        }
        var expectedResult = {
            isValid: false, 
            listInvalidComponents: ['city']
        }
        var actualResult = service.validateAddressComponents(example)

        expect(expectedResult).toEqual(actualResult)
    })

    it('test empty address object', function() {
        var example = {}
        var expectedResult = {
            isValid: false, 
            listInvalidComponents: service.list
        }
        var actualResult = service.validateAddressComponents(example)

        expect(expectedResult).toEqual(actualResult)
    })

    it('test undefined address object', function() {
        var expectedResult = {
            isValid: false, 
            listInvalidComponents: service.list
        }
        var actualResult = service.validateAddressComponents()

        expect(expectedResult).toEqual(actualResult)
    })

    it('test array input', function() {
        var expectedResult = {
            isValid: false, 
            listInvalidComponents: service.list
        }
        var actualResult = service.validateAddressComponents([{hello: 'World'}])

        expect(expectedResult).toEqual(actualResult)
    })
    it('test string input', function() {
        var expectedResult = {
            isValid: false, 
            listInvalidComponents: service.list
        }
        var actualResult = service.validateAddressComponents('address1')

        expect(expectedResult).toEqual(actualResult)
    })

  })

  describe('AddressComponents.revertToOriginal()', function() {
    var service

    beforeEach(angular.mock.module('googleAddress'))

    beforeEach(inject(function(_AddressComponents_) {
      service = _AddressComponents_
    }))

    it('test service method exists', function() {
      expect(service.revertToOriginal).not.toEqual(undefined)
    })

    it('test it works', function() {
        var original = {
            address1: '1337 Void St.', 
            city: 'Hommerton',
            zip: 90210,
        }
        var changed = Object.assign(original, {
            latitude: 147.1321, 
            city: 'Hommerton',
            country: 'MEX',
            zip: 12
        })
        
        service.revertToOriginal(changed, original)

        expect(changed).toEqual(original)
    })

  })

})();
