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
  current: `┌───────────────────────────┬─────────────────────┐
│                           │                     │
│  ┌───────────────┐  ┌──┐  └────────┐  ┌──────┐  │
│  │               │  │  │           │  │      │  │
│  ├───────────────┘  │  │  ┌────────┘  └──────┘  │
│  │                  │  └──┘                     │
│  │  ────────────────┘         ┌──┐  ┌──┐  ┌──┐  │
│  │                            │  │  │  │  │  │  │
│  ├───────────┬────────────────┘  │  │  │  │  │  │
│  │           │                   │  │  └──┘  │  │
│     ┌────┐   │  ┌──────┬──────┐  │  │        │  │
├─────┘    │   │  │    @ │ C    │  │  │   ┌────┘  │
│          │   │  │  ┌───┴───┐  │  │  │   │       │
│   ┌──────┘   │  │  │       │  │  │  │   └────┐  │
│   │P         │  │  │  ┌────┘  └──┘  │        │  │
│   └──────────┘  │  │  │             │   ┌────┘  │
│                 │  │  │  ┌─────┐  ┌─┘   │?      │
│   ┌─────────────┘  │  └──┘     └──┘     └───────┤
│   │                │        │                   │
│   │   ──────────┐  │  ──────┴────────────────┐  │
│   │             │  │                        p│  │
│   └─────────────┘  └─────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘`,
  default: `┌───────────────────────────┬─────────────────────┐
│                           │                     │
│  ┌───────────────┐  ┌──┐  └────────┐  ┌──────┐  │
│  │               │  │  │           │  │      │  │
│  ├───────────────┘  │  │  ┌────────┘  └──────┘  │
│  │                  │  └──┘                     │
│  │  ────────────────┘         ┌──┐  ┌──┐  ┌──┐  │
│  │                            │  │  │  │  │  │  │
│  ├───────────┬────────────────┘  │  │  │  │  │  │
│  │           │                   │  │  └──┘  │  │
│     ┌────┐   │  ┌──────┬──────┐  │  │        │  │
├─────┘    │   │  │    @ │ C    │  │  │   ┌────┘  │
│          │   │  │  ┌───┴───┐  │  │  │   │       │
│   ┌──────┘   │  │  │       │  │  │  │   └────┐  │
│   │P         │  │  │  ┌────┘  └──┘  │        │  │
│   └──────────┘  │  │  │             │   ┌────┘  │
│                 │  │  │  ┌─────┐  ┌─┘   │?      │
│   ┌─────────────┘  │  └──┘     └──┘     └───────┤
│   │                │        │                   │
│   │   ──────────┐  │  ──────┴────────────────┐  │
│   │             │  │                        p│  │
│   └─────────────┘  └─────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘`,
  aiSpeed: 60,
}