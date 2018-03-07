import expect from 'expect';
import { set, get } from '../src/index';

describe('Get function', () => {

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
            set('key', 'value');

            expect(
                get('key')
            ).toEqual('value');

        });

		it('should return a set value with a path string', () => {
			set('key/thing', 'value');

			expect(
				get('key/thing')
			).toEqual('value');

		});

		it('should return a set value with a path array', () => {
			set('key/thing', 'value');

			expect(
				get(['key', 'thing'])
			).toEqual('value');

		});

    });

	describe('When the key doesn\'t exist', () => {

		it('should return null', () => {

			expect(
				get('key')
			).toBe(null)

		});

	});

});