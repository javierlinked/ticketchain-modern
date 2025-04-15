import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155Abi = [
  {
    type: 'constructor',
    inputs: [{ name: 'uri_', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155Burnable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155BurnableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'burnBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155Pausable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155PausableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155MetadataURI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155MetadataUriAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pausable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pausableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const ticketContractAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'minter', internalType: 'address', type: 'address', indexed: true },
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
      { name: 'price', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'maxSellPerPerson', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TicketCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'seller', internalType: 'address', type: 'address', indexed: true },
      { name: 'buyer', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TicketSold',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'burnBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSellPerPerson', internalType: 'uint256', type: 'uint256' },
      { name: 'infoUrl', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'create',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tickets',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSellPerPerson', internalType: 'uint256', type: 'uint256' },
      { name: 'infoUrl', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenIds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenIdsLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'function', inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const ticketContractAddress = {
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
} as const

/**
 *
 */
export const ticketContractConfig = { address: ticketContractAddress, abi: ticketContractAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const readErc1155 = /*#__PURE__*/ createReadContract({ abi: erc1155Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc1155BalanceOf = /*#__PURE__*/ createReadContract({ abi: erc1155Abi, functionName: 'balanceOf' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readErc1155BalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readErc1155IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc1155SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"uri"`
 */
export const readErc1155Uri = /*#__PURE__*/ createReadContract({ abi: erc1155Abi, functionName: 'uri' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const writeErc1155 = /*#__PURE__*/ createWriteContract({ abi: erc1155Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeErc1155SafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc1155Abi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeErc1155SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc1155Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeErc1155SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: erc1155Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const simulateErc1155 = /*#__PURE__*/ createSimulateContract({ abi: erc1155Abi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateErc1155SafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc1155Abi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateErc1155SafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc1155Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateErc1155SetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: erc1155Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__
 */
export const watchErc1155Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc1155Abi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchErc1155ApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155Abi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchErc1155TransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155Abi,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchErc1155TransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155Abi,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"URI"`
 */
export const watchErc1155UriEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc1155Abi, eventName: 'URI' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155BurnableAbi}__
 */
export const readErc1155Burnable = /*#__PURE__*/ createReadContract({ abi: erc1155BurnableAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc1155BurnableBalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc1155BurnableAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readErc1155BurnableBalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: erc1155BurnableAbi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readErc1155BurnableIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: erc1155BurnableAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc1155BurnableSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc1155BurnableAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"uri"`
 */
export const readErc1155BurnableUri = /*#__PURE__*/ createReadContract({ abi: erc1155BurnableAbi, functionName: 'uri' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155BurnableAbi}__
 */
export const writeErc1155Burnable = /*#__PURE__*/ createWriteContract({ abi: erc1155BurnableAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"burn"`
 */
export const writeErc1155BurnableBurn = /*#__PURE__*/ createWriteContract({
  abi: erc1155BurnableAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"burnBatch"`
 */
export const writeErc1155BurnableBurnBatch = /*#__PURE__*/ createWriteContract({
  abi: erc1155BurnableAbi,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeErc1155BurnableSafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc1155BurnableAbi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeErc1155BurnableSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc1155BurnableAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeErc1155BurnableSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: erc1155BurnableAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155BurnableAbi}__
 */
export const simulateErc1155Burnable = /*#__PURE__*/ createSimulateContract({ abi: erc1155BurnableAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"burn"`
 */
export const simulateErc1155BurnableBurn = /*#__PURE__*/ createSimulateContract({
  abi: erc1155BurnableAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"burnBatch"`
 */
export const simulateErc1155BurnableBurnBatch = /*#__PURE__*/ createSimulateContract({
  abi: erc1155BurnableAbi,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateErc1155BurnableSafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc1155BurnableAbi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateErc1155BurnableSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc1155BurnableAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateErc1155BurnableSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: erc1155BurnableAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155BurnableAbi}__
 */
export const watchErc1155BurnableEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc1155BurnableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchErc1155BurnableApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155BurnableAbi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchErc1155BurnableTransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155BurnableAbi,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchErc1155BurnableTransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155BurnableAbi,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155BurnableAbi}__ and `eventName` set to `"URI"`
 */
export const watchErc1155BurnableUriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155BurnableAbi,
  eventName: 'URI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155PausableAbi}__
 */
export const readErc1155Pausable = /*#__PURE__*/ createReadContract({ abi: erc1155PausableAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc1155PausableBalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc1155PausableAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readErc1155PausableBalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: erc1155PausableAbi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readErc1155PausableIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: erc1155PausableAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"paused"`
 */
export const readErc1155PausablePaused = /*#__PURE__*/ createReadContract({
  abi: erc1155PausableAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc1155PausableSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc1155PausableAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"uri"`
 */
export const readErc1155PausableUri = /*#__PURE__*/ createReadContract({ abi: erc1155PausableAbi, functionName: 'uri' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155PausableAbi}__
 */
export const writeErc1155Pausable = /*#__PURE__*/ createWriteContract({ abi: erc1155PausableAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeErc1155PausableSafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc1155PausableAbi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeErc1155PausableSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc1155PausableAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeErc1155PausableSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: erc1155PausableAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155PausableAbi}__
 */
export const simulateErc1155Pausable = /*#__PURE__*/ createSimulateContract({ abi: erc1155PausableAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateErc1155PausableSafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc1155PausableAbi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateErc1155PausableSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc1155PausableAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155PausableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateErc1155PausableSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: erc1155PausableAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155PausableAbi}__
 */
export const watchErc1155PausableEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc1155PausableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155PausableAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchErc1155PausableApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155PausableAbi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155PausableAbi}__ and `eventName` set to `"Paused"`
 */
export const watchErc1155PausablePausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155PausableAbi,
  eventName: 'Paused',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155PausableAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchErc1155PausableTransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155PausableAbi,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155PausableAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchErc1155PausableTransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155PausableAbi,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155PausableAbi}__ and `eventName` set to `"URI"`
 */
export const watchErc1155PausableUriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155PausableAbi,
  eventName: 'URI',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155PausableAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchErc1155PausableUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155PausableAbi,
  eventName: 'Unpaused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc165Abi}__
 */
export const readErc165 = /*#__PURE__*/ createReadContract({ abi: erc165Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc165SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc165Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const readIerc1155 = /*#__PURE__*/ createReadContract({ abi: ierc1155Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc1155BalanceOf = /*#__PURE__*/ createReadContract({ abi: ierc1155Abi, functionName: 'balanceOf' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readIerc1155BalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readIerc1155IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc1155SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const writeIerc1155 = /*#__PURE__*/ createWriteContract({ abi: ierc1155Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeIerc1155SafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc1155Abi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeIerc1155SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc1155Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeIerc1155SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: ierc1155Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const simulateIerc1155 = /*#__PURE__*/ createSimulateContract({ abi: ierc1155Abi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateIerc1155SafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155Abi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateIerc1155SafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateIerc1155SetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const watchIerc1155Event = /*#__PURE__*/ createWatchContractEvent({ abi: ierc1155Abi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchIerc1155ApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155Abi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchIerc1155TransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155Abi,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchIerc1155TransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155Abi,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"URI"`
 */
export const watchIerc1155UriEvent = /*#__PURE__*/ createWatchContractEvent({ abi: ierc1155Abi, eventName: 'URI' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const readIerc1155MetadataUri = /*#__PURE__*/ createReadContract({ abi: ierc1155MetadataUriAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc1155MetadataUriBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readIerc1155MetadataUriBalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readIerc1155MetadataUriIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc1155MetadataUriSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"uri"`
 */
export const readIerc1155MetadataUriUri = /*#__PURE__*/ createReadContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'uri',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const writeIerc1155MetadataUri = /*#__PURE__*/ createWriteContract({ abi: ierc1155MetadataUriAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeIerc1155MetadataUriSafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeIerc1155MetadataUriSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeIerc1155MetadataUriSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const simulateIerc1155MetadataUri = /*#__PURE__*/ createSimulateContract({ abi: ierc1155MetadataUriAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateIerc1155MetadataUriSafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateIerc1155MetadataUriSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateIerc1155MetadataUriSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const watchIerc1155MetadataUriEvent = /*#__PURE__*/ createWatchContractEvent({ abi: ierc1155MetadataUriAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchIerc1155MetadataUriApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155MetadataUriAbi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchIerc1155MetadataUriTransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155MetadataUriAbi,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchIerc1155MetadataUriTransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155MetadataUriAbi,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"URI"`
 */
export const watchIerc1155MetadataUriUriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155MetadataUriAbi,
  eventName: 'URI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const readIerc1155Receiver = /*#__PURE__*/ createReadContract({ abi: ierc1155ReceiverAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc1155ReceiverSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc1155ReceiverAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const writeIerc1155Receiver = /*#__PURE__*/ createWriteContract({ abi: ierc1155ReceiverAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const writeIerc1155ReceiverOnErc1155BatchReceived = /*#__PURE__*/ createWriteContract({
  abi: ierc1155ReceiverAbi,
  functionName: 'onERC1155BatchReceived',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const writeIerc1155ReceiverOnErc1155Received = /*#__PURE__*/ createWriteContract({
  abi: ierc1155ReceiverAbi,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const simulateIerc1155Receiver = /*#__PURE__*/ createSimulateContract({ abi: ierc1155ReceiverAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const simulateIerc1155ReceiverOnErc1155BatchReceived = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155ReceiverAbi,
  functionName: 'onERC1155BatchReceived',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const simulateIerc1155ReceiverOnErc1155Received = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155ReceiverAbi,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc165Abi}__
 */
export const readIerc165 = /*#__PURE__*/ createReadContract({ abi: ierc165Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc165SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc165Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const readOwnable = /*#__PURE__*/ createReadContract({ abi: ownableAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const readOwnableOwner = /*#__PURE__*/ createReadContract({ abi: ownableAbi, functionName: 'owner' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const writeOwnable = /*#__PURE__*/ createWriteContract({ abi: ownableAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeOwnableRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: ownableAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeOwnableTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: ownableAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const simulateOwnable = /*#__PURE__*/ createSimulateContract({ abi: ownableAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateOwnableRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ownableAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateOwnableTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ownableAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const watchOwnableEvent = /*#__PURE__*/ createWatchContractEvent({ abi: ownableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchOwnableOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ownableAbi,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pausableAbi}__
 */
export const readPausable = /*#__PURE__*/ createReadContract({ abi: pausableAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pausableAbi}__ and `functionName` set to `"paused"`
 */
export const readPausablePaused = /*#__PURE__*/ createReadContract({ abi: pausableAbi, functionName: 'paused' })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pausableAbi}__
 */
export const watchPausableEvent = /*#__PURE__*/ createWatchContractEvent({ abi: pausableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Paused"`
 */
export const watchPausablePausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pausableAbi,
  eventName: 'Paused',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchPausableUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pausableAbi,
  eventName: 'Unpaused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__
 *
 *
 */
export const readTicketContract = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"balanceOf"`
 *
 *
 */
export const readTicketContractBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 *
 */
export const readTicketContractBalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 *
 */
export const readTicketContractIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"nonce"`
 *
 *
 */
export const readTicketContractNonce = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'nonce',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const readTicketContractOwner = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"paused"`
 *
 *
 */
export const readTicketContractPaused = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"supportsInterface"`
 *
 *
 */
export const readTicketContractSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"tickets"`
 *
 *
 */
export const readTicketContractTickets = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'tickets',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"tokenIds"`
 *
 *
 */
export const readTicketContractTokenIds = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'tokenIds',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"tokenIdsLength"`
 *
 *
 */
export const readTicketContractTokenIdsLength = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'tokenIdsLength',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"uri"`
 *
 *
 */
export const readTicketContractUri = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__
 *
 *
 */
export const writeTicketContract = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burn"`
 *
 *
 */
export const writeTicketContractBurn = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burnBatch"`
 *
 *
 */
export const writeTicketContractBurnBatch = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"buy"`
 *
 *
 */
export const writeTicketContractBuy = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"create"`
 *
 *
 */
export const writeTicketContractCreate = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'create',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"pause"`
 *
 *
 */
export const writeTicketContractPause = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const writeTicketContractRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 *
 */
export const writeTicketContractSafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 *
 */
export const writeTicketContractSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 *
 */
export const writeTicketContractSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const writeTicketContractTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"unpause"`
 *
 *
 */
export const writeTicketContractUnpause = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__
 *
 *
 */
export const simulateTicketContract = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burn"`
 *
 *
 */
export const simulateTicketContractBurn = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burnBatch"`
 *
 *
 */
export const simulateTicketContractBurnBatch = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"buy"`
 *
 *
 */
export const simulateTicketContractBuy = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"create"`
 *
 *
 */
export const simulateTicketContractCreate = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'create',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"pause"`
 *
 *
 */
export const simulateTicketContractPause = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const simulateTicketContractRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 *
 */
export const simulateTicketContractSafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 *
 */
export const simulateTicketContractSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 *
 */
export const simulateTicketContractSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const simulateTicketContractTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"unpause"`
 *
 *
 */
export const simulateTicketContractUnpause = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__
 *
 *
 */
export const watchTicketContractEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 *
 */
export const watchTicketContractApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 *
 */
export const watchTicketContractOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"Paused"`
 *
 *
 */
export const watchTicketContractPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'Paused',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TicketCreated"`
 *
 *
 */
export const watchTicketContractTicketCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TicketCreated',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TicketSold"`
 *
 *
 */
export const watchTicketContractTicketSoldEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TicketSold',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TransferBatch"`
 *
 *
 */
export const watchTicketContractTransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TransferSingle"`
 *
 *
 */
export const watchTicketContractTransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"URI"`
 *
 *
 */
export const watchTicketContractUriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'URI',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"Unpaused"`
 *
 *
 */
export const watchTicketContractUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'Unpaused',
})
