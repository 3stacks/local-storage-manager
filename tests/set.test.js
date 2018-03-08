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
		afterEach(() => {
			localStorage.clear();
		});

        it('setting a no-path string', () => {

			set('someKey', 'value');

            expect(
            	get('someKey')
            ).toEqual('value');

        });

        it('setting a path string', () => {
            set('some/key', 'newValue');

            expect(
            	get('some/key')
            ).toEqual('newValue')

        });

		it('setting a path array', () => {
			set(['new', 'key'], 'newValue');

			expect(
				get(['new', 'key'])
			).toEqual('newValue')

		});

		it('setting a path array with one item', () => {
			set(['someKey'], 'newValue');

			expect(
				get(['someKey'])
			).toEqual('newValue')

		});

    });

});