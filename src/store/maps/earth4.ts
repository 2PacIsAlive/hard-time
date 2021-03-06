// export default `┌─────────────────────────────────────────────────────────┐
// │                          *   *                         *│
// │ ┌──────────────┐  ┌───────────────────────────────────┐ │
// │ │              │  │                                   │ │
// │ │  ┌─────────┐ │* │  ┌────────────┐       ┌───────────┘ │
// │ │  │P *  * * └─┘  │  │            └───────┘             │
// │ │  │ *┌───┐ *   * │  │* ┌──────┐   *   *  *  ┌───────┐  │
// │ │  └──┘   └───────┘  └──┘      └─────────────┘       │* │
// │ │                                                    │  │
// │ │      ┌───────────────────────────────────────────┐ │  │
// │ │      │                        C                  │ │  │
// │ └───┐  │ ┌─────────────────────┐  ┌───────────┐    │ │  │
// │     │  │ │*                    │  │           │    │ │ *│
// │ ┌───┘  │ └─────────────┐  ┌─┐  │  │ ┌─┐       │    │ │  │
// │ │      │     *    *  * │  │ │  │  │ │ │       │    │ │  │
// │ └──────┘       ┌────┐ *│ *│ │  │  │ │ │ ┌─┐   │    │ │  │
// │           *    │    │* │  │ │  │  │ │ │ │ └───┘    │ │  │
// │ ┌──────────────┘    └──┘  │ │  │  │ │ │ │          │ │* │
// │ │                         │ │  │  │ │ │ └──────────┘ │  │
// │ │  ┌────┐ ┌───────────────┘ │@ │  │ │ │              │  │
// │ │  │    │ │                 └──┘  │ │ └───────────┐  │  │
// │ │  │    │*│                       │ │             │  │  │
// │ │  │    │ └───────────────────────┘ └─────────┐   │  │ *│
// │ │  │    │            *                        │   │  │  │
// │ │  │    └────────────────────┐  ┌─────────────┘   │  │  │
// │ │  │     *                   │  │                 │  │  │
// │ │  └─────────┐  ┌────────────┘  └──────┐  ┌───────┘  │  │
// │ │            │  │p        *          * │  │          │* │
// │ └────────────┘  └──────────────────────┘  └──────────┘  │
// │        *                                                │
// └─────────────────────────────────────────────────────────┘`
// export default {
//   current: `┌────┬───────┬────┬──────┐
// │    │       │p   │      │
// │ │  │   ─┐  └─┐ ?│   @│ │
// │ │ ┌┘    │    └──┤  ──┘ │
// │C│ │  ┌─ └─┐     ├─     │
// ├─┘ │  │    │ ┌─┐ │  ─┬─ │
// │   │ ┌┴─ ┌─┘ │ │ └┐  │  │
// │ │ │ │P  │   │ │  │ ─┴─ │
// │ └─┘ └───┴───┘ │ ─┘     │
// │               │        │
// └───────────────┴────────┘`,
//   default: `┌────┬───────┬────┬──────┐
// │    │       │p   │      │
// │ │  │   ─┐  └─┐ ?│   @│ │
// │ │ ┌┘    │    └──┤  ──┘ │
// │C│ │  ┌─ └─┐     ├─     │
// ├─┘ │  │    │ ┌─┐ │  ─┬─ │
// │   │ ┌┴─ ┌─┘ │ │ └┐  │  │
// │ │ │ │P  │   │ │  │ ─┴─ │
// │ └─┘ └───┴───┘ │ ─┘     │
// │               │        │
// └───────────────┴────────┘`,
//   aiSpeed: 20,
// }
export default {
  current: `┌────────────┬─────────────────────────┐
│           @│                         │
│  ┌──┐      │  ┌──┐         ┌──┐      │
│  │  ├──────┤  │  ├──────┐  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ ├───────┤  │ ├───────┤  │ │
│       └──┘ │       └──┘ │       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ ├───────┤  │ ├───────┤  │ │
│       └──┘ │       └──┘ │       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │P           │       ┌──┐ │
├───────┤  │ ├────────────┼───────┤  │ │
│       └──┘ │           p│       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ ├───────┤  │ ├───────┤  │ │
│       └──┘ │       └──┘ │       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ └───────┤  │ ├───────┤  │ │
│       └──┘         └──┘ │       └──┘ │
│!                        │? C         │
└─────────────────────────┴────────────┘`,
  default: `┌────────────┬─────────────────────────┐
│           @│                         │
│  ┌──┐      │  ┌──┐         ┌──┐      │
│  │  ├──────┤  │  ├──────┐  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ ├───────┤  │ ├───────┤  │ │
│       └──┘ │       └──┘ │       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ ├───────┤  │ ├───────┤  │ │
│       └──┘ │       └──┘ │       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │P           │       ┌──┐ │
├───────┤  │ ├────────────┼───────┤  │ │
│       └──┘ │           p│       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ ├───────┤  │ ├───────┤  │ │
│       └──┘ │       └──┘ │       └──┘ │
│  ┌──┐      │  ┌──┐      │  ┌──┐      │
│  │  ├──────┤  │  ├──────┤  │  ├──────┤
│  └──┘      │  └──┘      │  └──┘      │
│       ┌──┐ │       ┌──┐ │       ┌──┐ │
├───────┤  │ └───────┤  │ ├───────┤  │ │
│       └──┘         └──┘ │       └──┘ │
│!                        │? C         │
└─────────────────────────┴────────────┘`,
  aiSpeed: 60,  
  lore: 'you found a schematics for a more powerful automatic donut maker',
}