import expect from 'expect';
import { get, set } from '../src/index';

describe('Set function', () => {

    describe('The basics', () => {

        it('should be available', () => {

            expect(
                set
            ).toExist();

        });

        it('should be a function', () => {

            expect(
                set
            ).toBeA(
                Function
            )

        })

    });

    describe('Correct usage', () => {

        it('setting non-namespaced', () => {

            set('key', 'value');

            expect(
            	get('key')
            ).toEqual('value');

        });

        it('setting namespaced', () => {
			set('jewKey', 'jewValue', 'sampleNamespace');
            set('newKey', 'newValue', 'sampleNamespace');

            expect(
            	get('newKey', 'sampleNamespace')
            ).toEqual('newValue')

        });

    });

});