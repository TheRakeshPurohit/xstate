import { createMachine, StateValue } from 'xstate';
import { createTestModel } from '../src';

describe('states', () => {
  it('should test states by key', async () => {
    const testedStateValues: StateValue[] = [];
    const testModel = createTestModel(
      createMachine({
        initial: 'a',
        states: {
          a: {
            id: 'statea_a',
            on: {
              EVENT: 'b'
            }
          },
          b: {
            id: 'statae_b',
            initial: 'b1',
            states: {
              b1: { on: { NEXT: 'b2' } },
              b2: {}
            }
          }
        }
      }),
      {
        states: {
          a: (state) => {
            testedStateValues.push(state.value);
          },
          b: (state) => {
            testedStateValues.push(state.value);
          },
          'b.b1': (state) => {
            testedStateValues.push(state.value);
          },
          'b.b2': (state) => {
            testedStateValues.push(state.value);
          }
        }
      }
    );

    await testModel.testPlans(testModel.getShortestPlans());

    expect(testedStateValues).toMatchInlineSnapshot(`
      Array [
        "a",
        "a",
        Object {
          "b": "b1",
        },
        Object {
          "b": "b1",
        },
        "a",
        Object {
          "b": "b1",
        },
        Object {
          "b": "b1",
        },
        Object {
          "b": "b2",
        },
        Object {
          "b": "b2",
        },
      ]
    `);
  });
  it('should test states by ID', async () => {
    const testedStateValues: StateValue[] = [];
    const testModel = createTestModel(
      createMachine({
        initial: 'a',
        states: {
          a: {
            id: 'state_a',
            on: {
              EVENT: 'b'
            }
          },
          b: {
            id: 'state_b',
            initial: 'b1',
            states: {
              b1: {
                id: 'state_b1',
                on: { NEXT: 'b2' }
              },
              b2: {
                id: 'state_b2'
              }
            }
          }
        }
      }),
      {
        states: {
          '#state_a': (state) => {
            testedStateValues.push(state.value);
          },
          '#state_b': (state) => {
            testedStateValues.push(state.value);
          },
          '#state_b1': (state) => {
            testedStateValues.push(state.value);
          },
          '#state_b2': (state) => {
            testedStateValues.push(state.value);
          }
        }
      }
    );

    await testModel.testPlans(testModel.getShortestPlans());

    expect(testedStateValues).toMatchInlineSnapshot(`
      Array [
        "a",
        "a",
        Object {
          "b": "b1",
        },
        Object {
          "b": "b1",
        },
        "a",
        Object {
          "b": "b1",
        },
        Object {
          "b": "b1",
        },
        Object {
          "b": "b2",
        },
        Object {
          "b": "b2",
        },
      ]
    `);
  });
});