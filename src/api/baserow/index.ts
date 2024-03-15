type Tool = {
  'id': number;
  'Name': string;
  'Description': string;
  'Approved': boolean;
  'Image': {
    'url': string;
    'thumbnails': {
      'url': string;
      'name': string;
    }[];
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
  'Submitter Name': string;
  'Website': string;
}

interface ToolsResponse {
  'count': number;
  'next': string;
  'previous': string;
  'results': Tool[];
}

export async function getListOfTools(query: string = '') {
  const baseUrl = new URL('https://api.baserow.io/api/database/rows/table/266544/');
  const searchParams = new URLSearchParams({
    user_field_names: 'true',
    filters: JSON.stringify({
      "filter_type": "AND",
      "filters": [
        { "type": "boolean", "field": "Approved", "value": "1" }
      ],
      "groups": [],
    }),
    "include": 'Name,Description,Approved,Image,Short Description,Submitter Name,Website',
    search: query,
  })

  const response = await fetch(baseUrl.toString() + '?' + searchParams, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Token " + import.meta.env.BASEROW_API_KEY,
    },
  })

  const data: ToolsResponse = await response.json();

  return data;
}
