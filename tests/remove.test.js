import expect from 'expect';
import { get, set, remove } from '../src/index';

describe('Remove function', () => {
	afterEach(() => {
		console.log('cleared');
		localStorage.clear();
	});

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

        it('removing non-path string', () => {
            set('sampleKey', 'value');

			expect(
				get('sampleKey')
			).toBe('value');

			remove('sampleKey');

            expect(
			    get('sampleKey')
			).toBe(null);

        });

		it('removing path string', () => {
			set('some/key', 'value');

			expect(
				get('some/key')
			).toBe('value');

			console.log(get('some/key'));

			remove('some/key');

			expect(
				get('some/key')
			).toBe(null);

		});

		it('removing non-path array', () => {
			set(['sampleKey'], 'value');

			expect(
				get(['sampleKey'])
			).toBe('value');

			remove(['sampleKey']);

			expect(
				get(['sampleKey'])
			).toBe(null);

		});

		it('removing path array', () => {
			set(['some', 'key'], 'value');

			expect(
				get(['some', 'key'])
			).toBe('value');

			remove(['some', 'key']);

			expect(
				get(['some', 'key'])
			).toBe(null);

		});

    });

});