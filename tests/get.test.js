import expect from 'expect';
import { set, get } from '../src/index';

describe('Get function', () => {
	afterEach(() => {
		localStorage.clear();
	});

    describe('The basics', () => {

        it('should be available', () => {

            expect(
                get
            ).toExist();

        });

        it('should be a function', () => {

            expect(
                get
            ).toBeA(
                Function
            )

        })

    });

    describe('Correct usage', () => {

        it('should return a set value with a no-path string', () => {
            set('someKey', 'value');

            expect(
                get('someKey')
            ).toEqual('value');

        });

		it('should return a set value with a path string', () => {
			set('someKey/thing', 'value');

			expect(
				get('someKey/thing')
			).toEqual('value');

		});

		it('should return a set value with a path array', () => {
			set('someKey/thing', 'value');

			expect(
				get(['someKey', 'thing'])
			).toEqual('value');

		});

    });

	describe('When the key doesn\'t exist', () => {

		it('should return null', () => {

			expect(
				get('asdf')
			).toBe(null)

		});

	});

});