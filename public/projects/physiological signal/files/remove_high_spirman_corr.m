function [X_train_return, rows_return, cols_return, keep_track_return, vff_Spearman, Weights_return]=remove_high_spirman_corr(rows, cols, X_train_cut, keep_track, Weights)
    % this function remove all the features that has feature-feature
    % correlation above 0.8
    values = [rows(1),cols(1)]; % first pair
    Weights_feature_1 = Weights(rows(1));
    Weights_feature_2 = Weights(cols(1));
    if abs(Weights_feature_1)>abs(Weights_feature_2) 
        X_train_return = X_train_cut(:,[1:values(2)-1,values(2)+1:end]);
        keep_track_return = keep_track([1:values(2)-1,values(2)+1:end]);
        Weights_return = Weights([1:values(2)-1,values(2)+1:end]);
        vff_Spearman=abs(corr(X_train_return,'type','Spearman'));
        vff_Spearman = vff_Spearman-eye(size(X_train_return,2));
        [rows_return, cols_return] = find(vff_Spearman>=0.8);
    else
        X_train_return = X_train_cut(:,[1:values(1)-1,values(1)+1:end]);
        keep_track_return = keep_track([1:values(1)-1,values(1)+1:end]);
        Weights_return = Weights([1:values(1)-1,values(1)+1:end]);
        vff_Spearman=abs(corr(X_train_return,'type','Spearman'));
        vff_Spearman = vff_Spearman-eye(size(X_train_return,2));
        [rows_return, cols_return] = find(vff_Spearman>=0.8);
    end
end