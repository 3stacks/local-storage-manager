import expect from 'expect';
import { set } from '../src/index';

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
                JSON.parse(localStorage.getItem('key'))
            ).toEqual('value');

        });

        it('setting namespaced', () => {
            set('newKey', 'newValue', 'namespace');

            expect(
                JSON.parse(localStorage.getItem(['namespace']['newKey']))
            ).toEqual('newValue')

        });

    });

});