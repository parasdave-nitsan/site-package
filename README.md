Website Starter Kit
This Website Starter Kit is a TYPO3 CMS extension for building websites with reusable components such as an image slider, FAQ, contact form, and custom Content Blocks.

It is compatible with TYPO3 CMS 14.0 and newer within the 14.x release line.

Installation with Composer
The Website Starter Kit can be installed in a Composer-based TYPO3 installation.

Install from Git
Add the Website Starter Kit Git repository to your project's composer.json:

"repositories": {
    "website-starter-kit": {
        "type": "vcs",
        "url": "YOUR-GIT-REPOSITORY-URL"
    }
}

Then require the extension:

ddev composer require company/website-starter-kit:@dev

Or with Composer directly:

composer require company/website-starter-kit:@dev

The extension declares the following dependencies automatically:

TYPO3 CMS Core ^14.0
TYPO3 CMS RTE CKEditor ^14.0
TYPO3 CMS Fluid Styled Content ^14.0
Friends of TYPO3 Content Blocks ^2.4
Therefore, you do not need to install Content Blocks separately when installing this extension.

Local Development Installation
For local development, you can place the extension in the packages/ directory of your TYPO3 project:

packages/
└── website-starter-kit/
    ├── Classes/
    ├── Configuration/
    ├── ContentBlocks/
    ├── Resources/
    ├── composer.json
    └── ext_emconf.php

Configure the path repository in your root composer.json:

"repositories": {
    "packages": {
        "type": "path",
        "url": "./packages/*"
    }
}

Then install the extension:

ddev composer require company/website-starter-kit:@dev

Or:

composer require company/website-starter-kit:@dev

Extension Information
Property	Value
Composer package	company/website-starter-kit
TYPO3 extension key	website_starter_kit
PHP namespace	Company\WebsiteStarterKit
Extension type	typo3-cms-extension
TYPO3 version	^14.0
Content Blocks	^2.4

TYPO3 Extension Manager
The extension key is:

website_starter_kit

The extension is displayed in the TYPO3 backend with the title:

Website Starter Kit

The extension key and the backend title are intentionally different. The extension key is machine-readable, while the title is human-readable.

Content Blocks
This extension uses Content Blocks to provide custom content elements.

The package requires:

friendsoftypo3/content-blocks ^2.4

The extension contains custom Content Blocks such as the Image Slider.

For example:

name: website-starter-kit/image-slider
typeName: website_starter_kit_image_slider
group: website_starter_kit

Image Slider
The Image Slider Content Block supports multiple slider items.

Each slider item can contain:

Image
Header
Link
Example configuration:

name: website-starter-kit/image-slider
typeName: website_starter_kit_image_slider
group: website_starter_kit

prefixFields: true
prefixType: full

fields:
  - identifier: slider_items
    label: Slider Items
    type: Collection
    minitems: 1

    appearance:
      collapseAll: true
      levelLinksPosition: both

    fields:
      - identifier: slider_image
        label: Image
        type: File
        allowed: common-image-types
        minitems: 1
        relationship: manyToOne

      - identifier: slider_header
        label: Header
        type: Text

      - identifier: slider_link
        label: Link
        type: Link

Load Example Data
If the extension provides initial/example data, it can be loaded with DDEV:

ddev typo3 extension:setup

Without DDEV:

vendor/bin/typo3 extension:setup

If automatic loading does not work, you can import the data manually:

ddev typo3 impexp:import EXT:website_starter_kit/Initialisation/data.xml

Include the Site Set
If the extension provides a Site Set, include the Website Starter Kit Set in your TYPO3 site configuration.

For example, edit:

config/sites/mysite/config.yaml

and add:

dependencies:
  - company/website-starter-kit

The dependency name uses the Site Set identifier defined by the extension.

Classic TYPO3 Installations
For Composer-based TYPO3 installations, Composer installation is recommended.

For a classic TYPO3 installation, place the extension in:

typo3conf/ext/website_starter_kit/

Then activate the extension from the TYPO3 Extension Manager.

The extension key is:

website_starter_kit

Requirements
TYPO3 CMS ^14.0
PHP version supported by your installed TYPO3 CMS 14 version
Friends of TYPO3 Content Blocks ^2.4
Development
The extension follows PSR-4 autoloading:

Company\WebsiteStarterKit\

mapped to:

Classes/

The Composer configuration contains:

"autoload": {
    "psr-4": {
        "Company\\WebsiteStarterKit\\": "Classes/"
    }
}

After changing PHP classes or Composer configuration, regenerate the autoloader:

ddev composer dump-autoload

License
This extension is licensed under:

GPL-2.0-or-later

Author
John Doe

Email: john.doe@gmail.com

Homepage: https://homepage.com