import expect from 'expect';
import { setItem, getItem } from '../src/index';

describe('Get function', () => {
	afterEach(() => {
		localStorage.clear();
	});

    describe('The basics', () => {

        it('should be available', () => {

            expect(
                getItem
            ).toExist();

        });

        it('should be a function', () => {

            expect(
                getItem
            ).toBeA(
                Function
            )

        })

    });

    describe('Correct usage', () => {

        it('should return a setItem value with a no-path string', () => {
            setItem('someKey', 'value');

            expect(
                getItem('someKey')
            ).toEqual('value');

        });

		it('should return a setItem value with a path string', () => {
			setItem('someKey/thing', 'value');

			expect(
				getItem('someKey/thing')
			).toEqual('value');

		});

		it('should return a setItem value with a path array', () => {
			setItem('someKey/thing', 'value');

			expect(
				getItem(['someKey', 'thing'])
			).toEqual('value');

		});

    });

	describe('When the key doesn\'t exist', () => {

		it('should return null', () => {

			expect(
				getItem('asdf')
			).toBe(null)

		});

		it('should return default value when provided', () => {

			expect(
				getItem('asdf', ['array'])
			).toEqual(['array']);

			expect(
				getItem('asdf/sdfagd', ['array'])
			).toEqual(['array']);

			expect(
				getItem(['asdfg', 'dfagd'], ['array'])
			).toEqual(['array']);

		});

	});

});