type Thumbnails = {
  tiny: { url: string; name: string };
  small: { url: string; name: string };
}

export type Tool = {
  'id': number;
  'Name': string;
  'Description': string;
  'Approved': boolean;
  'Image': {
    'url': string;
    thumbnails: Thumbnails;
    'visible_name': string;
    'name': string;
    'size': number;
    'mime_type': string;
    'is_image': boolean;
    'image_width': number;
    'image_height': number;
    'uploaded_at': string;
  }[];
  'Short Description': string;
  Tags: {
    'id': number;
    'value': string;
  }[];
  'Website': string;
}

interface ToolsResponse {
  'count': number;
  'next': string;
  'previous': string;
  'results': Tool[];
}

export async function getListOfTools(query: string = '', tag: string = '') {
  const baseUrl = new URL('https://api.baserow.io/api/database/rows/table/266544/');

  const filters = [
    {
      "type": "boolean",
      "field": "Approved",
      "value": "1"
    }
  ]

  if (tag) {
    filters.push({ "type": "contains_word", "field": "Tags", "value": tag })
  }

  const searchParams = new URLSearchParams({
    user_field_names: 'true',
    filters: JSON.stringify({
      "filter_type": "AND",
      "filters": filters,
      "groups": [],
    }),
    "include": 'Name,Description,Approved,Image,Short Description,Website,Tags',
    search: query,
    size: '200'
  })

  const response = await fetch(baseUrl.toString() + '?' + searchParams, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Token " + import.meta.env.BASEROW_API_KEY,
      'Cache-Control': 'max-age=3600',
    },
  })

  const data: ToolsResponse = await response.json();

  return data;
}

export async function getSingleTool(id: number | string): Promise<Tool> {
  const response = await fetch('https://api.baserow.io/api/database/rows/table/266544/' + id + '/?user_field_names=true', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Token " + import.meta.env.BASEROW_API_KEY,
      'Cache-Control': 'max-age=3600',
    },
  })

  const data: Tool = await response.json();

  return data;
}

export async function getListFields() {
  const response = await fetch('https://api.baserow.io/api/database/fields/table/266544/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Token " + import.meta.env.BASEROW_API_KEY,
      'Cache-Control': 'max-age=3600',
    },
  })

  const data = await response.json();

  return data;
}

export async function getListOfTags(): Promise<{ id: number, value: string }[]> {
  const listFieldsResponse = await getListFields();
  const tags = listFieldsResponse.filter((field: any) => field.name === 'Tags');
  const tagOptions: { id: number, value: string }[] = tags?.[0]?.select_options;
  return tagOptions.sort((a, b) => a.value.localeCompare(b.value));
}