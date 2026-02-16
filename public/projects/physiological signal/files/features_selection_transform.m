function [Xs_test] = features_selection_transform(Xv_test, Y_test)
    best_comb = [11	12	13	14	15	16	17	18	19	20];
    
    len=size(Xv_test,2);
    X_discreted=zeros(size(Xv_test));
    for r = 1:len
%         figure;
        avg = mean(Xv_test(:,r));
        STD = 0.5*std(Xv_test(:,r));
        Max = max(max(Xv_test(:,r)),avg+STD)+1;
        Min = min(min(Xv_test(:,r)),avg-STD)-1;
%         subplot(1,2,1); plot(1:1:length(Xv_test(:,r)),Xv_test(:,r),'.');  yline(Min,'-');  yline(avg-STD,'-');  yline(avg+STD,'-'); yline(Max,'-');
        [X_discreted(:,r),~] = discretize(Xv_test(:,r),[Min avg-STD avg+STD Max]); %tsprctile(Xv_train(:,r),[0,25,75,100]));
%         subplot(1,2,2); histogram(X_discreted(:,r));
%         sgtitle(r)
    end
    Xs_test = X_discreted(:, best_comb);
    nft = fscmrmr(Xs_test,Y_test);
end
