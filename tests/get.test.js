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

        it('getting non-namespaced', () => {
            set('key', 'value');

            expect(
                get('key')
            ).toEqual('value');

        });

        it('getting namespaced', () => {
            set('newKey', 'newValue', 'namespace');

            expect(
                get('newKey', 'namespace')
            ).toEqual('newValue')

        });

    });

	describe('When the key doesn\'t exist', () => {

		it('should return null', () => {

			expect(
				get('key')
			).toBe(null)

		});

		it('should return null on namespaced', () => {

			expect(
				get('key', 'sampleNamespace')
			).toBe(null)

		});

	});

});