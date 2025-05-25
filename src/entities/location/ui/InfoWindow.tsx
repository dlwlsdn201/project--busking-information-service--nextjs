interface LocationInfoWindowProps {
  name: string;
  requireApprove: boolean;
  imageUrls?: string[];
  id: string;
}

export const infoWindowContent = ({
  name,
  requireApprove,
  imageUrls,
  id,
}: LocationInfoWindowProps): string => {
  return `
    <div class="min-w-[18rem] min-h-[20rem] p-4 rounded border-0 bg-white shadow-md text-start">
      <div class="font-bold text-indigo-600">${name}</div>
      <div class="text-xs text-gray-500">
        ${requireApprove ? '허가 필요' : '허가 불필요'}
      </div>
      <div id="slider-container-${id}" style="
        overflow:hidden; 
        width:16rem;
        height:100%;
        margin:0 auto;
        position: relative;"
      >
        <div class="rounded" id="slider-${id}" style="
          white-space: nowrap;
          transition: transform 0.3s ease;
        ">
            ${
              imageUrls
                ?.map(
                  (src) =>
                    `<img src=${src} class="inline-block w-[16rem] object-cover rounded" />`
                )
                .join('') ?? 'no image'
            }
        </div>
        <div class="absolute h-full top-[0] left-[0] flex w-full  items-center gap-2 justify-between z-50">
          <button class="cursor-pointer text-green-500 text-xl font-bold" id="prevBtn-${id}"><</button>
          <button class="cursor-pointer text-green-500 text-xl font-bold" id="nextBtn-${id}">></button>
        </div>
      </div>

    </div>
    `;
};
