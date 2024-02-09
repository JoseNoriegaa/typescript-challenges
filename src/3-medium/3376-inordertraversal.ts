/**
 * 3376 - InorderTraversal
 *
 * Implement the type version of binary tree inorder traversal.
 *
 * For example:
 *
 * ```typescript
 * const tree1 = {
 *   val: 1,
 *   left: null,
 *   right: {
 *     val: 2,
 *     left: {
 *       val: 3,
 *       left: null,
 *       right: null,
 *     },
 *     right: null,
 *   },
 * } as const
 *
 * type A = InorderTraversal<typeof tree1> // [1, 3, 2]
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

type InorderTraversal<T extends TreeNode | null> = T extends { val: number, left: TreeNode, right: null }
  ? [...InorderTraversal<T['left']>, T['val']]
  : T extends { val: number, right: TreeNode, left: null }
    ? [T['val'], ...InorderTraversal<T['right']>]
    : T extends { val: number, left: null, right: null }
      ? [T['val']]
      : []

type R = InorderTraversal<typeof tree1>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]
