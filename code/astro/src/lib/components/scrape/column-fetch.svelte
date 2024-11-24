<script lang="ts">
  import { delay, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs'
  import { onMount } from 'svelte'
  import { trpc } from '~/lib/common/trpc'
  import { getSubject } from '~/lib/common/util'
  import Spinner from '../spinner.svelte'

  let category = ''
  let codeStr = ''
  let isLoading = false

  const btnSubmit$ = getSubject<boolean>()
  const btnCopy$ = getSubject<Event>()

  const info$ = btnSubmit$.pipe(
    map(() => category),
    distinctUntilChanged(),
    tap(() => {
      isLoading = true
    }),
    switchMap((c) => trpc.scrape.getPostsItems.query(c)),
    tap(() => {
      isLoading = false
    }),
    shareReplay(1)
  )

  const btnCopySub = btnCopy$
    .pipe(
      tap((e: Event) => {
        const elemBtn = e.target as HTMLButtonElement
        const text = elemBtn.dataset.code ?? ''
        navigator.clipboard.writeText(text).then(() => {
          alert('copied')
        })
      })
    )
    .subscribe()

  const sourceCodeSub = info$
    .pipe(
      delay(100),
      tap(() => {
        const elemDiv = document.querySelector('#dd')
        if (elemDiv) {
          const style = `
<style>
  .css-rss {
    --tw-size-1: 4px;
  }
  div.css-rss > ul > li {
    padding-top: var(--tw-size-1);
    padding-bottom: var(--tw-size-1);
  }

  div.css-rss > ul > li > a > div {
    display: flex;
    gap: var(--tw-size-1);
  }

  div.css-rss > ul > li > a > div > img {
    -o-object-fit: contain;
    object-fit: contain;
  }

  div.css-rss > ul > li > a > div > div {
    display: flex;
    flex-direction: column;
    gap: var(--tw-size-1);
  }
</style>
`
          codeStr = `${style}${elemDiv.innerHTML}`.replace('*{}', '')
        }
      })
    )
    .subscribe()

  onMount(() => {
    return () => {
      btnCopySub.unsubscribe()
      sourceCodeSub.unsubscribe()
    }
  })
</script>

<form class="flex" on:submit|preventDefault={() => btnSubmit$.next(true)}>
  <span>
    <label for="">category: </label>
    <input bind:value={category} type="text" class="border p-2" placeholder="Empty is fine." />
  </span>
  <button class="btn ml-1">scrape</button>
</form>

<hr />

{#if isLoading}
  <div>
    <Spinner className="h-32 w-32" />
  </div>
{/if}

{#if !isLoading && $info$}
  <div class="w-full flex flex-col items-end">
    <button class="btn" data-code={codeStr} on:click|preventDefault={(e) => btnCopy$.next(e)}>
      copy
    </button>
    <textarea id="tt" disabled class="h-[200px] w-full border p-1">{codeStr}</textarea>
  </div>

  <hr />

  <div id="dd" class="css-rss">
    <ul>
      {#each $info$ as item}
        <li>
          <a href={item.href}>
            <div>
              <img
                src={item.imgSrc}
                srcset={item.imgSrcset}
                sizes={item.imgSizes}
                alt={item.title}
              />
              <div>
                <h2>{item.title}</h2>
                <span>{item.publishDate}</span>
                <span>{item.category}</span>
              </div>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .css-rss {
    --tw-size-1: 4px;
  }
  div.css-rss > ul > li {
    padding-top: var(--tw-size-1);
    padding-bottom: var(--tw-size-1);
  }

  div.css-rss > ul > li > a > div {
    display: flex;
    gap: var(--tw-size-1);
  }

  div.css-rss > ul > li > a > div > img {
    -o-object-fit: contain;
    object-fit: contain;
  }

  div.css-rss > ul > li > a > div > div {
    display: flex;
    flex-direction: column;
    gap: var(--tw-size-1);
  }
</style>
