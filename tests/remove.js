import expect from 'expect';
import { get, set, remove } from '../src/index';

describe('Remove function', () => {

    describe('The basics', () => {

        it('should be available', () => {

            expect(
                remove
            ).toExist();

        });

        it('should be a function', () => {

            expect(
                remove
            ).toBeA(
                Function
            )

        })

    });

    describe('Correct usage', () => {

		beforeEach(() => {
			localStorage.clear();
		});

        it('removing non-namespaced', () => {
            set('sampleKey', 'value');

			expect(
				get('sampleKey')
			).toBe('value');

			remove('sampleKey');

            expect(
			    get('sampleKey')
			).toBe(null);

        });

        it('removing namespaced', () => {
            set('newKey', 'newValue', 'sampleNamespace');
            set('jewKey', 'jewValue', 'sampleNamespace');

			expect(
				get('newKey', 'sampleNamespace')
			).toBe('newValue');

			remove('newKey', 'sampleNamespace');

			console.log(get('newKey', 'sampleNamespace'));

            expect(
            	get('newKey', 'sampleNamespace')
            ).toBe(null);

        });

    });

});