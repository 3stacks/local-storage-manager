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

        it('setting a no-path string', () => {

            set('key', 'value');

            expect(
            	get('key')
            ).toEqual('value');

        });

        it.only('setting a path string', () => {
            set('some/key', 'newValue');

            console.log(localStorage.getItem('some'));

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
			set(['key'], 'newValue');

			expect(
				get(['key'])
			).toEqual('newValue')

		});

    });

});