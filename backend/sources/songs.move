module onchainradio::songs{

    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::aptos_coin::{AptosCoin}; 
    use aptos_framework::aptos_account::transfer_coins ; 
    use std::signer;
    use std::vector; 
    use std::string::String;


    // ERRORS
    const ERROR_USER_NOT_CREATOR :u64 = 1;
    const ERROR_ALREADY_CREATOR :u64 = 2; 

    //events
    #[event]
    struct CreatorAdded has drop, store {
        creator_address: address, 
        name: String, 
        image_uri: String, 
        timestamp: u64
    }

    #[event]
    struct SongPublished has drop, store {
        creator_address: address,
        title: String, 
        uri: String, 
        image_uri: String,
        timestamp: u64
    }

    // constants
    const ADMIN: address = @admin ;
    const PLATFORM_FEE_PERCENT: u64 = 5; 

    //structs

    struct Creator has key, store, drop {
        creator_address: address,
        name: String, 
        image_uri: String,
        timestamp: u64, 
        songs: vector<Song>
    }

    struct Song has store, drop {
        creator_address: address, 
        title: String, 
        uri: String, 
        image_uri: String,
        description: String, 
        timestamp: u64
    }

    public entry fun add_creator(
        account: &signer, 
        _name: String, 
        _image_uri: String

    ) {
        let _creator_address = signer::address_of(account); 
        assert!(!exists<Creator>(_creator_address), ERROR_ALREADY_CREATOR);
        let creator = Creator {
            creator_address: _creator_address, 
            name: _name, 
            image_uri: copy _image_uri,
            timestamp: timestamp::now_seconds(), 
            songs: vector::empty<Song>()
        }; 
        move_to(account, creator); 
        event::emit(CreatorAdded{
            creator_address: _creator_address, 
            name: _name, 
            image_uri: _image_uri,
            timestamp:timestamp::now_seconds()
        })
    }

    public entry fun publish_song(
        account: &signer, 
        _title: String, 
        _uri: String, 
        _image_uri: String,
        _description: String
    ) acquires Creator {
        assert!(exists<Creator>(signer::address_of(account)), ERROR_USER_NOT_CREATOR); 
        let song = Song { 
            creator_address: signer::address_of(account), 
            title: copy _title, 
            uri: copy _uri, 
            description: copy _description, 
            image_uri: copy _image_uri,
            timestamp: timestamp::now_seconds() 
        };
        let creator_songs = &mut borrow_global_mut<Creator>(signer::address_of(account)).songs;
        vector::push_back(creator_songs, song);
        event::emit(
            SongPublished{
                creator_address: signer::address_of(account), 
                title: _title, 
                uri: _uri, 
                image_uri: _image_uri,
                timestamp: timestamp::now_seconds()
            }
        ); 
    }

    public entry fun tip_artist(
        account: &signer, 
        amount: u64, 
        creator_address: address
    ) {
        let platformFee: u64 = (PLATFORM_FEE_PERCENT * amount) / 100 ; 
        let artistFee: u64 = amount - platformFee ; 
        transfer_coins<AptosCoin>(account, ADMIN, platformFee); 
        transfer_coins<AptosCoin>(account, creator_address, artistFee); 
    }

    #[view]
    public fun isCreator(account: address): bool {
        exists<Creator>(account)
    }

    #[view]
    public fun getCreatorName(account: address): String acquires Creator {
        borrow_global<Creator>(account).name
    } 

}

