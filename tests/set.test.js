import expect from 'expect';
import { getItem, setItem } from '../src/index';

describe('Set function', () => {

    describe('The basics', () => {

        it('should be available', () => {

            expect(
                setItem
            ).toExist();

        });

        it('should be a function', () => {

            expect(
                setItem
            ).toBeA(
                Function
            )

        })

    });

    describe('Correct usage', () => {
		afterEach(() => {
			localStorage.clear();
		});

        it('putting a no-path string', () => {

			setItem('someKey', 'value');

            expect(
            	getItem('someKey')
            ).toEqual('value');

        });

        it('putting a path string', () => {
            setItem('some/key', 'newValue');

            expect(
            	getItem('some/key')
            ).toEqual('newValue')

        });

		it('putting a path array', () => {
			setItem(['new', 'key'], 'newValue');

			expect(
				getItem(['new', 'key'])
			).toEqual('newValue')

		});

		it('putting a path array with one item', () => {
			setItem(['someKey'], 'newValue');

			expect(
				getItem(['someKey'])
			).toEqual('newValue')

		});

    });

});