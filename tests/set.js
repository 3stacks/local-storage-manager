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

});